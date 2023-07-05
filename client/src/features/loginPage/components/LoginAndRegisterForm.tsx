import { EyeInvisibleOutlined, EyeTwoTone, InboxOutlined } from '@ant-design/icons';
import { Col, Divider, Form, Input, message, Row, Typography, UploadProps } from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../../components/custom/button/PrimaryButton';
import PrimaryDragger from '../../../components/custom/dragger/PrimaryDragger';
import PrimaryForm from '../../../components/custom/form/PrimaryForm';
import PrimaryInput from '../../../components/custom/input/PrimaryInput';
import { setLogin } from '../../../state';
import { isAcceptanceFile, isAcceptanceFileQuestion } from '../../../utils/fileUtil';
import { ELoginEnum } from '../enums/LoginEnum';

const LoginAndRegisterForm = () => {
  const [form] = Form.useForm();
  const [pageType, setPageType] = useState<ELoginEnum>(ELoginEnum.Login);
  const [droppedFileName, setDroppedFileName] = useState<string>('');
  const [droppedFileSize, setDroppedFileSize] = useState<string>('');
  const [status, setStatus] = useState<string>('normal');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogin = _.includes(ELoginEnum.Login, pageType);
  const isRegister = _.includes(ELoginEnum.Register, pageType);

  // xu ly keo tha file
  const handleDrop: UploadProps['onDrop'] = (e: any) => {
    const { name } = e.dataTransfer.files[0];
    setDroppedFileName(name);
  };

  // format kieu du lieu file khi upload
  function formatBytes(bytes: number, decimals = 2) {
    return `${(bytes / 1024 / 1024).toFixed(decimals)} MB`;
  }

  // xu ly onChange file
  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    const file = newFileList?.[0];
    const { size = 0, name } = file;
    setDroppedFileName(name);
    setDroppedFileSize(formatBytes(size));
    if (size && size > 20 * 1024 * 1024) {
      setStatus('error');
      // message.error('Dung lượng file không được quá 20MB');
      return false;
    }
    if (name && !isAcceptanceFile(name)) {
      setStatus('error');
      // message.error(`Đính kèm không hợp lệ. Chỉ chập nhận định dạng ${_.join(['jpg', 'jpeg', 'png'], ', ')}`);
      return false;
    } else {
      setStatus('done');
    }
  };

  // xu ly uploadfile props
  const uploadProps: UploadProps = {
    multiple: false,
    onChange: handleChange,
    onDrop: handleDrop,
    beforeUpload: (file) => {
      if (file.size && file.size > 20 * 1024 * 1024) {
        // message.error('Dung lượng file không được quá 20MB');
        return false;
      }
      if (file.name && !isAcceptanceFile(file.name)) {
        // message.error('File không hợp lệ');
        return false;
      }
      return false;
    },
  };

  const register = async (values: any) => {
    // this allows us to send form info with image
    const formData = new FormData();
    const { picture } = values ?? {};
    for (const item in values) {
      if (!_.isNil(values[item])) {
        formData.append(`${item}`, values[item]);
      }
    }
    formData.append('picturePath', picture?.file?.name);

    const savedUserResponse = await fetch('http://localhost:3001/auth/register', {
      method: 'POST',
      body: formData,
    });
    const savedUser = await savedUserResponse.json();
    // onSubmitProps.resetForm();

    if (savedUser) {
      setPageType(ELoginEnum.Login);
    }
  };

  // login
  const login = async (values: any) => {
    const loggedInResponse = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate('/home');
    }
  };

  // submit form
  const handleSubmit = (values: any) => {
    if (isLogin) login(values);
    if (isRegister) register(values);
  };

  useEffect(() => {
    if (pageType) {
      form.resetFields();
      form.setFieldValue('picture', undefined);
      setStatus('normal');
      setDroppedFileSize('');
      setDroppedFileName('');
    }
  }, [pageType]);

  return (
    <div>
      <PrimaryForm form={form} name='login-form' layout='vertical' onFinish={handleSubmit}>
        <Row gutter={[12, 12]}>
          {/* register */}
          {isRegister && (
            <>
              {/* first name */}
              <Col span={12}>
                <Form.Item
                  label='Tên'
                  required
                  name='firstName'
                  className='mb-0'
                  rules={[
                    {
                      validator: async (__, value) => {
                        if (!value) {
                          return await Promise.reject(new Error('Vui lòng nhập tên của bạn!'));
                        }
                        if (_.size(value) >= 14) {
                          return await Promise.reject(new Error('Tên không được dài quá 14 kí tự!'));
                        }
                        return await Promise.resolve();
                      },
                    },
                  ]}
                >
                  <PrimaryInput allowClear placeholder='Nhập tên của bạn' type={'text'} />
                </Form.Item>
              </Col>

              {/* last name */}
              <Col span={12}>
                <Form.Item
                  label='Họ'
                  required
                  name='lastName'
                  className='mb-0'
                  rules={[
                    {
                      validator: async (__, value) => {
                        if (!value) {
                          return await Promise.reject(new Error('Vui lòng nhập họ của bạn!'));
                        }
                        if (_.size(value) >= 14) {
                          return await Promise.reject(new Error('Họ không được dài quá 14 kí tự!'));
                        }
                        return await Promise.resolve();
                      },
                    },
                  ]}
                >
                  <PrimaryInput allowClear placeholder='Nhập họ của bạn' type={'text'} />
                </Form.Item>
              </Col>

              {/* location */}
              <Col span={24}>
                <Form.Item
                  label='Địa chỉ (nơi ở hiện tại)'
                  required
                  name='location'
                  className='mb-0'
                  rules={[
                    {
                      validator: async (__, value) => {
                        if (!value) {
                          return await Promise.reject(new Error('Vui lòng nhập địa chỉ của bạn!'));
                        }
                        if (_.size(value) >= 200) {
                          return await Promise.reject(new Error('Địa chỉ không được dài quá 200 kí tự!'));
                        }
                        return await Promise.resolve();
                      },
                    },
                  ]}
                >
                  <PrimaryInput allowClear placeholder='Nhập địa chỉ của bạn' type={'text'} />
                </Form.Item>
              </Col>

              {/* occupation */}
              <Col span={24}>
                <Form.Item
                  label='Nghề nghiệp'
                  required
                  name='occupation'
                  className='mb-0'
                  rules={[
                    {
                      validator: async (__, value) => {
                        if (!value) {
                          return await Promise.reject(new Error('Vui lòng nhập nghề nghiệp của bạn!'));
                        }
                        if (_.size(value) >= 200) {
                          return await Promise.reject(new Error('Nghề nghiệp không được dài quá 200 kí tự!'));
                        }
                        return await Promise.resolve();
                      },
                    },
                  ]}
                >
                  <PrimaryInput allowClear placeholder='Nhập nghề nghiệp của bạn' type={'text'} />
                </Form.Item>
              </Col>

              {/* file */}
              <Col span={24}>
                <Form.Item
                  name='picture'
                  className='mb-0'
                  rules={[
                    () => ({
                      validator: async (__, value) => {
                        const { file } = value ?? {};
                        const { size = 0, name } = file ?? {};
                        const getSizeFile: number = size - 20 * 1024 * 1024;

                        if (!value) {
                          return Promise.reject('Vui lòng đính kèm file!');
                        }
                        if (Number.isInteger(getSizeFile) && getSizeFile > 0) {
                          return await Promise.reject(new Error('Dung lượng file không được quá 20MB!'));
                        }
                        if (name && !isAcceptanceFileQuestion(name)) {
                          return await Promise.reject(
                            new Error(
                              `Đính kèm không hợp lệ. Chỉ chập nhận định dạng ${_.join(['jpg', 'jpeg', 'png'], ', ')}!`
                            )
                          );
                        }
                        return await Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <PrimaryDragger
                    {...uploadProps}
                    accept={'.jpg,.jpeg,.png'}
                    droppedFileName={droppedFileName}
                    droppedFileSize={droppedFileSize}
                    onHandleClickRemoveFile={() => {
                      form.setFieldValue('file', undefined);
                      setStatus('normal');
                      setDroppedFileSize('');
                      setDroppedFileName('');
                      form.validateFields(['file']);
                    }}
                    maxCount={1}
                    variant={`${status === 'error' ? 'failed' : status === 'done' ? 'success' : 'normal'}`}
                    className='[&_.ant-upload-list]:hidden'
                  />
                </Form.Item>
              </Col>
            </>
          )}

          {/* email */}
          <Col span={24}>
            <Form.Item
              required
              className='mb-0'
              label='Email'
              name={'email'}
              rules={[
                {
                  validator: async (__, value) => {
                    if (!value) {
                      return await Promise.reject(new Error('Vui lòng nhập email!'));
                    } else if (!/\S+@\S+\.\S+/.test(value)) {
                      return Promise.reject('Vui lòng nhập địa chỉ email hợp lệ!');
                    }
                    return await Promise.resolve();
                  },
                },
              ]}
            >
              <PrimaryInput allowClear placeholder='Nhập email' type={'email'} />
            </Form.Item>
          </Col>

          {/* password */}
          <Col span={24}>
            <Form.Item
              className='mb-0'
              required
              label='Password'
              name={'password'}
              rules={[
                {
                  validator: async (__, value) => {
                    if (!value) {
                      return await Promise.reject(new Error('Vui lòng nhập password!'));
                    }
                    if (_.size(value) > 27) {
                      return await Promise.reject(new Error('Password chỉ được nhập tối đa 27 kí tự!'));
                    }
                    return await Promise.resolve();
                  },
                },
              ]}
            >
              <Input.Password
                placeholder='Nhập password'
                type={'password'}
                allowClear
                className='py-3'
                iconRender={(visible: any) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
          </Col>

          {/* button submit */}
          <Col span={17} className='m-auto'>
            <Divider className='mb-2 mt-4 opacity-20 bg-purple-900 shadow-sm' />
          </Col>
          <Col span={24}>
            <PrimaryButton htmlType='submit' className='bg-purple-950 text-purple-200 h-12 w-full text-center text-lg'>
              {isLogin ? 'Login' : 'Register'}
            </PrimaryButton>
          </Col>

          {/* login or register */}
          <Col span={24}>
            <Typography
              className='text-sm hover:underline cursor-pointer text-purple-950 ml-2'
              onClick={() => setPageType(isLogin ? ELoginEnum.Register : ELoginEnum.Login)}
            >
              {isLogin
                ? 'Nếu bạn chưa có tài khoản, vui lòng đăng ký ở đây'
                : 'Nếu bạn đã có tài khoản, vui lòng đăng nhập ở đây'}
            </Typography>
          </Col>
        </Row>
      </PrimaryForm>
    </div>
  );
};

export default LoginAndRegisterForm;
