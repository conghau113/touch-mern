import {
  BookOutlined,
  BorderlessTableOutlined,
  CameraFilled,
  EnvironmentOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  InboxOutlined,
  MailOutlined,
  UserOutlined,
  WechatFilled,
} from '@ant-design/icons';
import { Col, Divider, Form, Input, message, Row, Space, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import Typography from 'antd/es/typography/Typography';
import { RcFile } from 'antd/es/upload';
import Dragger from 'antd/es/upload/Dragger';
import _ from 'lodash';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePassword, updateUser } from '../../../apis/service/users';
import PrimaryButton from '../../../components/custom/button/PrimaryButton';
import PrimaryCard from '../../../components/custom/card/PrimaryCard';
import PrimaryForm from '../../../components/custom/form/PrimaryForm';
import PrimaryModal from '../../../components/custom/modal/PrimaryModal';
import SharedAvatarAuthUser from '../../../components/shared/SharedAvatar';
import SharedFollowButton from '../../../components/shared/SharedFollowButton';
import { isLoggedIn, logoutUser } from '../../../helper/authhelper';
import useConversationStore from '../../../state/useConversationStore';
import useUserStore from '../../../state/useUserStore';
import { tw } from '../../../utils/classUtil';
import { getBase64 } from '../../../utils/fileUtil';
import { imageUpload } from '../../../utils/imageUpload';
import useChatBoxStore from '../../chatBox/store/useChatBoxStore';
import UpdateProfileModalStore from '../store/UpdateProfileModalStore';
import UpdateProfileModal from './UpdateProfileModal';

interface ProfileContentPorps {
  profile: any;
  onSubmit: (values: any) => void;
  fetchUser?: () => void;
  isHover?: boolean;
}

export default function ProfileContent(props: ProfileContentPorps) {
  const { profile, onSubmit, fetchUser, isHover } = props ?? {};
  const [formChangePass] = Form.useForm();
  const { user } = profile ?? {};
  const { username, biography, avatar, email, fullName, location, occupation } = user ?? {};
  const isAuth = _.includes(isLoggedIn().username, username);
  const navigate = useNavigate();
  const { setOpen } = UpdateProfileModalStore();
  const userLogin = isLoggedIn();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [isOpenChangePassword, setOPenChangePassword] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState('');
  const { setUser } = useUserStore();
  const { setCurrent } = useConversationStore();
  const { setOpenConversation, setOpenListUser } = useChatBoxStore();

  const handleLogout = async () => {
    logoutUser();
    navigate('/login');
  };

  const handleChangeImg: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
    setFileList(newFileList);
    const url = await getBase64(newFileList[0]?.originFileObj as RcFile);

    setPreviewImage(url);
    setPreviewOpen(true);
  };

  const uploadProps: UploadProps = {
    onChange: handleChangeImg,
    fileList,
  };

  const handleMessage = () => {
    navigate('/messenger', { state: { user: profile.user } });
    if (profile) {
      setCurrent(profile?.user?.username);
    }
  };

  const handleOK = async () => {
    if (_.size(fileList)) {
      const uploadAva = await updateUser(userLogin, { avatar: fileList });
      const media = await imageUpload(fileList);
      setPreviewOpen(false);
      setUser({ avatar: media?.[0]?.url });
      setFileList([]);
      setPreviewImage('');
    }
    fetchUser?.();
  };

  const handleClose = () => {
    setPreviewOpen(false);
    setFileList([]);
    setPreviewImage('');
  };

  const handleChangePassword = async (values: any) => {
    const { oldPassword, newPassword } = values ?? {};
    console.log('values::', values);
    const body = {
      oldPassword,
      newPassword,
    };
    const msg = await changePassword(userLogin, body);
    if (msg.error) {
      console.log('error:', msg.error);
    } else {
      message.success('Password updated successfully.');
      setOPenChangePassword(false);
    }
  };

  console.log('profile', profile);

  return (
    <>
      <PrimaryCard className=' bg-main-purple '>
        <Space className='mb-1 w-full'>
          <div
            onClick={() => {
              if (isAuth) {
                setPreviewOpen(true);
              } else {
                navigate(`/users/${username}`);
              }
            }}
            className='flex items-center justify-center w-full relative group cursor-pointer '
          >
            <SharedAvatarAuthUser
              avatar={!!_.size(profile?.user?.avatar) ? profile?.user?.avatar?.[0]?.avatar?.[0]?.url : undefined}
              userName={!!_.size(profile?.user?.avatar) ? profile?.user?.avatar?.[0]?.avatar?.[0]?.url : username}
              className='w-16 h-16'
            />
            {isAuth && (
              <div className='flex items-center justify-center absolute h-16 w-16 rounded-full border ease-in-out transition-opacity bg-gray-600 bg-opacity-40 opacity-0 group-hover:opacity-100 '>
                <CameraFilled className='text-gray-200 text-2xl shadow-md' />
              </div>
            )}
          </div>
          <div className='ml-2  w-full'>
            <Typography className='text-white mb-0.5 font-medium flex items-center'>
              <BorderlessTableOutlined /> {username}
            </Typography>
            <Typography className='text-white text-xs font-normal text-opacity-90'>{biography}</Typography>
          </div>
          {!isAuth && (
            <Space className='absolute top-7 right-1'>
              <SharedFollowButton iconClassname={'text-white'} followingUserId={user?._id} username={user?.username} />
            </Space>
          )}
        </Space>
        {isAuth && !isHover && (
          <>
            {/* <div className='px-12'>
              <Divider className='my-2 bg-transparent border border-dashed' />
            </div> */}
            <Space className='flex w-full justify-center my-2'>
              <Typography className='text-xs text-white border-r pr-2 border-r-gray-500'>
                Likes: {profile?.posts?.likeCount}
              </Typography>
              <Typography className='text-xs text-white border-r pr-2 border-r-gray-500'>
                Posts: {profile?.posts?.count}
              </Typography>
              <Typography className='text-xs text-white border-r pr-2 border-r-gray-500'>
                Followes: {profile?.user?.followers?.length}
              </Typography>
              <Typography className='text-xs text-white'>Following: {profile?.user?.following?.length}</Typography>
            </Space>
          </>
        )}
        <PrimaryCard className='flex border-dashed bg-transparent flex-wrap flex-col gap-2 mt-3'>
          <div className='flex gap-3'>
            <UserOutlined className='text-white flex items-center' />
            <Typography className='text-white text-center font-normal'>{fullName}</Typography>
          </div>
          <div className='flex gap-3'>
            <MailOutlined className='text-white flex items-center' />
            <Typography className='text-white text-center font-normal'>{email}</Typography>
          </div>
          <div className='flex gap-3'>
            <EnvironmentOutlined className='text-white flex items-center' />
            <Typography className='text-white text-center font-normal'>{location}</Typography>
          </div>
          <div className='flex gap-3'>
            <BookOutlined className='text-white flex items-center' />
            <Typography className='text-white text-center font-normal'>{occupation}</Typography>
          </div>
        </PrimaryCard>
        {isAuth ? (
          !isHover && (
            <div className='flex mt-4 justify-evenly gap-3 flex-col'>
              <div className='flex gap-3'>
                <PrimaryButton
                  onClick={() => setOPenChangePassword(true)}
                  className='w-1/2 hover:opacity-80 text-white'
                >
                  Change password
                </PrimaryButton>
                <PrimaryButton onClick={() => setOpen(true)} className='w-1/2 hover:opacity-80 text-white'>
                  Edit profile
                </PrimaryButton>
              </div>
              <PrimaryButton
                onClick={handleLogout}
                className='w-full bg-main-pink hover:opacity-80 border-none text-white'
              >
                Log out
              </PrimaryButton>
            </div>
          )
        ) : (
          <div className='flex mt-4 justify-evenly'>
            <PrimaryButton
              onClick={handleMessage}
              className='h-10 flex items-center justify-center bg-white hover:opacity-80 w-full text-main-purple'
            >
              <WechatFilled className='text-lg' /> Message
            </PrimaryButton>
          </div>
        )}
      </PrimaryCard>
      <UpdateProfileModal inittialProfile={user} onSubmit={onSubmit} />

      {/* update avatar */}
      <PrimaryModal
        open={previewOpen}
        title={'Chỉnh sửa hình ảnh'}
        onCancel={handleClose}
        onOk={handleOK}
        okButtonProps={{ className: 'bg-blue-11 text-base text-white font-medium' }}
        cancelButtonProps={{ className: 'text-base font-medium' }}
      >
        <ImgCrop
          cropShape='round'
          showGrid
          rotationSlider
          aspectSlider
          showReset
          modalProps={{
            okButtonProps: { className: 'bg-blue-11 text-base text-white font-medium' },
            cancelButtonProps: {
              className: 'text-base font-medium',
            },
          }}
        >
          <Dragger {...uploadProps} className={tw(previewImage ? 'hidden' : '', 'border-dashed border-2')}>
            <p className='ant-upload-text'>Hãy kéo ảnh vào đây hoặc chọn ảnh</p>
            <p className='ant-upload-drag-icon'>
              <InboxOutlined className='text-blue-11' />
            </p>
          </Dragger>
        </ImgCrop>
        {previewImage ? (
          <img alt='preview' className='rounded-full pb-2' style={{ width: '100%' }} src={previewImage} />
        ) : null}
      </PrimaryModal>

      {/* change password modal */}
      <PrimaryModal
        open={isOpenChangePassword}
        title={'Change password'}
        onCancel={() => {
          setOPenChangePassword(false);
        }}
        width={600}
        destroyOnClose
        // onOk={handleChangePassword}
        okButtonProps={{ className: 'bg-blue-11 text-base text-white font-medium' }}
        cancelButtonProps={{ className: 'text-base font-medium' }}
        footer={null}
      >
        <PrimaryForm
          form={formChangePass}
          onFinish={handleChangePassword}
          preserve={false}
          name='change-password'
          layout='vertical'
        >
          <Row gutter={[24, 12]}>
            <Col span={24}>
              <Form.Item
                className='mb-0'
                required
                label='Old password'
                name={'oldPassword'}
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
                  placeholder='Enter password'
                  type={'password'}
                  allowClear
                  className='py-3'
                  iconRender={(visible: any) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
            </Col>

            {/* new pass */}
            <Col span={24}>
              <Form.Item
                className='mb-0'
                required
                label='New password'
                name={'newPassword'}
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
                  placeholder='Enter new password'
                  type={'password'}
                  onChange={(e) => {
                    if (!!_.size(formChangePass.getFieldValue('confirmNewPassword'))) {
                      formChangePass.validateFields(['confirmNewPassword']);
                    }
                  }}
                  allowClear
                  className='py-3'
                  iconRender={(visible: any) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
            </Col>

            {/* confirm new pass */}
            <Col span={24}>
              <Form.Item
                className='mb-0'
                required
                label='Confirm new password'
                name={'confirmNewPassword'}
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
                      if (formChangePass.getFieldValue('newPassword') !== value) {
                        return await Promise.reject(new Error('Confirm new password is not correct'));
                      }
                      return await Promise.resolve();
                    },
                  },
                ]}
              >
                <Input.Password
                  placeholder='Enter confirm new password'
                  type={'password'}
                  allowClear
                  className='py-3'
                  iconRender={(visible: any) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
            </Col>
            <Col className='mb-5 mt-2' span={24}>
              <PrimaryButton htmlType='submit' variant='primary'>
                Change
              </PrimaryButton>
            </Col>
          </Row>
        </PrimaryForm>
      </PrimaryModal>
    </>
  );
}
