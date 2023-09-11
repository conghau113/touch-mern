import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Col, Divider, Form, Input, message, Row, Space, Typography } from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword, login, signup } from '../../../apis/service/users';
import PrimaryButton from '../../../components/custom/button/PrimaryButton';
import PrimaryForm from '../../../components/custom/form/PrimaryForm';
import PrimaryInput from '../../../components/custom/input/PrimaryInput';
import PrimaryModal from '../../../components/custom/modal/PrimaryModal';
import { loginUser } from '../../../helper/authhelper';
import useUserStore from '../../../state/useUserStore';
import { ELoginEnum } from '../enums/LoginEnum';
import emailjs from '@emailjs/browser';
import useBackdropStore from '../../../state/useBackdropStore';

const LoginAndRegisterForm = () => {
  const [form] = Form.useForm();
  const [forgotPasswordForm] = Form.useForm();
  const [pageType, setPageType] = useState<ELoginEnum>(ELoginEnum.Login);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [isSendMail, setSendMail] = useState<boolean>(false);
  const [genPass, setGenPass] = useState<string | number>('');

  const navigate = useNavigate();

  const { setUser } = useUserStore();
  const { setOpenBackdrop } = useBackdropStore();

  const isLogin = _.includes(ELoginEnum.Login, pageType);
  const isRegister = _.includes(ELoginEnum.Register, pageType);

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
      setUser({ username: data?.username });
      navigate('/');
    }
  };

  // submit form
  const handleSubmit = (values: any) => {
    if (isLogin) handleLogin(values);
    if (isRegister) handleRegister(values);
  };

  const sendEmail = () => {
    setOpenBackdrop(true);
    const newPass = Math.floor(Math.random() * 100000000);
    emailjs
      .send(
        'service_c3wq3vo',
        'template_5mypcfh',
        {
          email: forgotPasswordForm.getFieldValue('confirmEmail'),
          message: newPass,
        },
        'eVUw2oFh3z3NTtm-n'
      )
      .then(
        () => {
          message.success('Email successfully sent!');
          setOpenBackdrop(false);
          setGenPass(newPass);
          setSendMail(true);
        },
        () => {
          message.error('Failed to send the email, please try again');
          setOpenBackdrop(false);
          setSendMail(false);
        }
      );
  };

  const handlSendEmail = async () => {
    await forgotPasswordForm.validateFields();
    sendEmail();
  };

  const handleForgotPassword = async (params: { email: string; newPassword: string | number }) => {
    await forgotPassword(params);
    handleLogin({
      email: params?.email,
      password: params?.newPassword,
    });
    setOpenModal(false);
  };

  const handlSendEmailConfirm = async () => {
    await forgotPasswordForm.validateFields();
    const values = forgotPasswordForm.getFieldsValue();
    if (genPass === parseInt(values?.confirmPassword)) {
      const params = {
        email: values?.confirmEmail,
        newPassword: values?.confirmPassword,
      };
      handleForgotPassword(params);
    } else {
      message.error('Password incorrect, please try again!');
    }
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
                  label='Full name'
                  required
                  name='fullName'
                  className='mb-0'
                  rules={[
                    {
                      validator: async (__, value) => {
                        if (!value) {
                          return await Promise.reject(new Error('Please enter your full name'));
                        }
                        if (_.size(value) >= 40) {
                          return await Promise.reject(
                            new Error('First and last name must not be longer than 40 characters!')
                          );
                        }
                        if (_.size(value) < 6) {
                          return await Promise.reject(new Error('First and last name must be at least 6 characters!'));
                        }
                        return await Promise.resolve();
                      },
                    },
                  ]}
                >
                  <PrimaryInput allowClear placeholder='Enter full name' type={'text'} />
                </Form.Item>
              </Col>

              {/* location */}
              <Col span={24}>
                <Form.Item
                  label='Address (current residence)'
                  required
                  name='location'
                  className='mb-0'
                  rules={[
                    {
                      validator: async (__, value) => {
                        if (!value) {
                          return await Promise.reject(new Error('Please enter your address!'));
                        }
                        if (_.size(value) >= 200) {
                          return await Promise.reject(new Error('The address cannot be longer than 200 characters!'));
                        }
                        return await Promise.resolve();
                      },
                    },
                  ]}
                >
                  <PrimaryInput allowClear placeholder='Enter your address' type={'text'} />
                </Form.Item>
              </Col>

              {/* occupation */}
              <Col span={24}>
                <Form.Item
                  label='Username'
                  required
                  name='username'
                  className='mb-0'
                  rules={[
                    {
                      validator: async (__, value) => {
                        if (!value) {
                          return await Promise.reject(new Error('Please enter your username!'));
                        }
                        if (_.size(value) >= 200) {
                          return await Promise.reject(new Error('username cannot be longer than 200 characters!'));
                        }
                        return await Promise.resolve();
                      },
                    },
                  ]}
                >
                  <PrimaryInput allowClear placeholder='Enter your username' type={'text'} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label='Occupation'
                  required
                  name='occupation'
                  className='mb-0'
                  rules={[
                    {
                      validator: async (__, value) => {
                        if (!value) {
                          return await Promise.reject(new Error('Please enter your occupation!'));
                        }
                        if (_.size(value) >= 200) {
                          return await Promise.reject(new Error('Occupation cannot be longer than 200 characters!'));
                        }
                        return await Promise.resolve();
                      },
                    },
                  ]}
                >
                  <PrimaryInput allowClear placeholder='Enter your occupation' type={'text'} />
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
                      return await Promise.reject(new Error('Enter your email!'));
                    } else if (!/\S+@\S+\.\S+/.test(value)) {
                      return Promise.reject('Please enter a valid email address!');
                    }
                    return await Promise.resolve();
                  },
                },
              ]}
            >
              <PrimaryInput allowClear placeholder='Enter email' type={'email'} />
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
                      return await Promise.reject(new Error('Enter your password!'));
                    }
                    if (_.size(value) > 27) {
                      return await Promise.reject(
                        new Error('Password can only be entered with a maximum of 27 characters!')
                      );
                    }
                    if (_.size(value) < 6) {
                      return await Promise.reject(new Error('Password must be entered at least 6 characters!'));
                    }
                    return await Promise.resolve();
                  },
                },
              ]}
            >
              <Input.Password
                placeholder='Enter password'
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
          <Col span={24} className='flex justify-between'>
            <Typography
              className='text-sm hover:underline cursor-pointer text-purple-950 ml-2'
              onClick={() => setPageType(isLogin ? ELoginEnum.Register : ELoginEnum.Login)}
            >
              {isLogin
                ? `If you don't have an account yet, please register here`
                : 'If you already have an account, please log in here'}
            </Typography>
            <Typography
              onClick={() => setOpenModal(true)}
              className='text-sm mr-2.5 text-main-purple hover:underline cursor-pointer'
            >
              Forgot password
            </Typography>
          </Col>
        </Row>
      </PrimaryForm>
      <PrimaryModal
        variant='default'
        title='Forgot password'
        open={isOpenModal}
        onCancel={() => {
          setOpenModal(false);
          setSendMail(false);
        }}
        footer={null}
        centered
        destroyOnClose
      >
        <Divider className='mb-4 bg-main-purple' />
        <PrimaryForm name='forgot-password-form' layout='vertical' form={forgotPasswordForm} preserve={false}>
          <Row gutter={[24, 12]}>
            <Col span={24}>
              <Form.Item
                required
                className='mb-0'
                label='Email'
                name={'confirmEmail'}
                rules={[
                  {
                    validator: async (__, value) => {
                      if (!value) {
                        return await Promise.reject(new Error('Please enter email address!'));
                      }
                      if (!/\S+@\S+\.\S+/.test(value)) {
                        return Promise.reject('Please enter a valid email address!');
                      }
                      return await Promise.resolve();
                    },
                  },
                ]}
              >
                <PrimaryInput allowClear placeholder='Enter email' type={'email'} />
              </Form.Item>
            </Col>
            <Col span={24}>
              {isSendMail && (
                <Form.Item
                  className='mb-0'
                  required
                  label='Password'
                  name={'confirmPassword'}
                  rules={[
                    {
                      validator: async (__, value) => {
                        if (!value) {
                          return await Promise.reject(new Error('Please enter password!'));
                        }
                        if (_.size(value) > 27) {
                          return await Promise.reject(
                            new Error('Password can only be entered with a maximum of 27 characters!')
                          );
                        }
                        if (_.size(value) < 6) {
                          return await Promise.reject(new Error('Password must be entered at least 6 characters!'));
                        }
                        return await Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input.Password
                    placeholder='Enter password'
                    type={'password'}
                    allowClear
                    className='py-3'
                    iconRender={(visible: any) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>
              )}
            </Col>
            <Col span={18}>
              <Typography className='text-xs italic'>*Please, check your email and confirm new password!</Typography>
            </Col>
            {isSendMail ? (
              <Col span={6} className='flex justify-end'>
                <PrimaryButton onClick={handlSendEmailConfirm} className='h-12' variant='primary'>
                  Confirm
                </PrimaryButton>
              </Col>
            ) : (
              <Col span={6} className='flex justify-end'>
                <PrimaryButton onClick={handlSendEmail} className='h-12' variant='primary'>
                  Send
                </PrimaryButton>
              </Col>
            )}
          </Row>
        </PrimaryForm>
      </PrimaryModal>
    </div>
  );
};

export default LoginAndRegisterForm;
