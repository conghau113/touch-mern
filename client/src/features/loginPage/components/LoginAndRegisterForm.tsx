import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Col, Divider, Form, Input, message, Row, Typography } from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, signup } from '../../../apis/service/users';
import PrimaryButton from '../../../components/custom/button/PrimaryButton';
import PrimaryForm from '../../../components/custom/form/PrimaryForm';
import PrimaryInput from '../../../components/custom/input/PrimaryInput';
import { loginUser } from '../../../helper/authhelper';
import { setLogin } from '../../../state';
import { ELoginEnum } from '../enums/LoginEnum';
import useAuthStore from '../store/useAuthStore';

const LoginAndRegisterForm = () => {
  const [form] = Form.useForm();
  const [pageType, setPageType] = useState<ELoginEnum>(ELoginEnum.Login);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLogin = _.includes(ELoginEnum.Login, pageType);
  const isRegister = _.includes(ELoginEnum.Register, pageType);

  const { setUserAuth } = useAuthStore();

  // xu ly keo tha file
  // const handleDrop: UploadProps['onDrop'] = (e: any) => {
  //   const { name } = e.dataTransfer.files[0];
  //   setDroppedFileName(name);
  // };

  // // format kieu du lieu file khi upload
  // function formatBytes(bytes: number, decimals = 2) {
  //   return `${(bytes / 1024 / 1024).toFixed(decimals)} MB`;
  // }

  // // xu ly onChange file
  // const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
  //   const file = newFileList?.[0];
  //   const { size = 0, name } = file;
  //   setDroppedFileName(name);
  //   setDroppedFileSize(formatBytes(size));
  //   if (size && size > 20 * 1024 * 1024) {
  //     setStatus('error');
  //     // message.error('Dung lượng file không được quá 20MB');
  //     return false;
  //   }
  //   if (name && !isAcceptanceFile(name)) {
  //     setStatus('error');
  //     // message.error(`Đính kèm không hợp lệ. Chỉ chập nhận định dạng ${_.join(['jpg', 'jpeg', 'png'], ', ')}`);
  //     return false;
  //   } else {
  //     setStatus('done');
  //   }
  // };

  // // xu ly uploadfile props
  // const uploadProps: UploadProps = {
  //   multiple: false,
  //   onChange: handleChange,
  //   onDrop: handleDrop,
  //   beforeUpload: (file) => {
  //     if (file.size && file.size > 20 * 1024 * 1024) {
  //       // message.error('Dung lượng file không được quá 20MB');
  //       return false;
  //     }
  //     if (file.name && !isAcceptanceFile(file.name)) {
  //       // message.error('File không hợp lệ');
  //       return false;
  //     }
  //     return false;
  //   },
  // };

  const handleRegister = async (values: any) => {
    const data = await signup(values);
    if (data.error) {
      message.error(data.error);
    } else {
      message.success('Register successful!');
      loginUser(data);
      setPageType(ELoginEnum.Login);
    }
  };

  // login
  const handleLogin = async (values: { email: string; password: string | number }) => {
    const data = await login(values);
    if (data.error) {
      message.error(data.error);
    } else {
      loginUser(data);
      navigate('/');
    }
  };

  // submit form
  const handleSubmit = (values: any) => {
    if (isLogin) handleLogin(values);
    if (isRegister) handleRegister(values);
  };

  useEffect(() => {
    if (pageType) {
      form.resetFields();
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
              <Col span={24}>
                <Form.Item
                  label='Họ và tên'
                  required
                  name='fullName'
                  className='mb-0'
                  rules={[
                    {
                      validator: async (__, value) => {
                        if (!value) {
                          return await Promise.reject(new Error('vui lòng nhập họ và tên của bạn'));
                        }
                        if (_.size(value) >= 40) {
                          return await Promise.reject(new Error('họ và tên không được dài quá 40 kí tự!'));
                        }
                        if (_.size(value) < 6) {
                          return await Promise.reject(new Error('họ và tên phải tối thiểu 6 kí tự!'));
                        }
                        return await Promise.resolve();
                      },
                    },
                  ]}
                >
                  <PrimaryInput allowClear placeholder='Nhập họ và tên của bạn' type={'text'} />
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
                  label='Nick-Name'
                  required
                  name='username'
                  className='mb-0'
                  rules={[
                    {
                      validator: async (__, value) => {
                        if (!value) {
                          return await Promise.reject(new Error('Vui lòng nick-name của bạn!'));
                        }
                        if (_.size(value) >= 200) {
                          return await Promise.reject(new Error('Nick-name không được dài quá 200 kí tự!'));
                        }
                        return await Promise.resolve();
                      },
                    },
                  ]}
                >
                  <PrimaryInput allowClear placeholder='Nhập nick-name của bạn' type={'text'} />
                </Form.Item>
              </Col>
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
              {/* <Col span={24}>
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
              </Col> */}
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
                    if (_.size(value) < 6) {
                      return await Promise.reject(new Error('Password phải nhập tối thiểu 6 kí tự!'));
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
