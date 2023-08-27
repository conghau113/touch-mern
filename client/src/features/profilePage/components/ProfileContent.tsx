import {
  BookOutlined,
  BorderlessTableOutlined,
  CameraFilled,
  EnvironmentOutlined,
  InboxOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Space, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import Typography from 'antd/es/typography/Typography';
import { RcFile } from 'antd/es/upload';
import Dragger from 'antd/es/upload/Dragger';
import _ from 'lodash';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../../apis/service/users';
import PrimaryButton from '../../../components/custom/button/PrimaryButton';
import PrimaryCard from '../../../components/custom/card/PrimaryCard';
import PrimaryModal from '../../../components/custom/modal/PrimaryModal';
import SharedAvatarAuthUser from '../../../components/shared/SharedAvatar';
import { isLoggedIn, logoutUser } from '../../../helper/authhelper';
import { tw } from '../../../utils/classUtil';
import { getBase64 } from '../../../utils/fileUtil';
import UpdateProfileModalStore from '../store/UpdateProfileModalStore';
import UpdateProfileModal from './UpdateProfileModal';

interface ProfileContentPorps {
  profile: any;
  onSubmit: (values: any) => void;
  fetchUser: () => void;
}

export default function ProfileContent(props: ProfileContentPorps) {
  const { profile, onSubmit, fetchUser } = props ?? {};
  const { user } = profile ?? {};
  const { username, biography, avatar, email, fullName, location, occupation } = user ?? {};
  const isAuth = _.includes(isLoggedIn().username, username);
  const navigate = useNavigate();
  const { setOpen } = UpdateProfileModalStore();
  const userLogin = isLoggedIn();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState('');

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

  const handleOK = async () => {
    if (_.size(fileList)) {
      await updateUser(userLogin, { avatar: fileList });
      setPreviewOpen(false);
      setFileList([]);
      setPreviewImage('');
    }
    fetchUser();
  };
  const handleClose = () => {
    setPreviewOpen(false);
    setFileList([]);
    setPreviewImage('');
  };

  return (
    <>
      <PrimaryCard className=' bg-main-purple '>
        <Space className='mb-1'>
          <div
            onClick={() => setPreviewOpen(true)}
            className='flex items-center justify-center w-full relative group cursor-pointer '
          >
            <SharedAvatarAuthUser
              avatar={!!_.size(profile?.user?.avatar) ? profile?.user?.avatar?.[0]?.avatar?.[0]?.url : undefined}
              userName={!!_.size(profile?.user?.avatar) ? profile?.user?.avatar?.[0]?.avatar?.[0]?.url : username}
              className='w-16 h-16'
            />
            <div className='flex items-center justify-center absolute h-16 w-16 rounded-full border ease-in-out transition-opacity bg-gray-600 bg-opacity-40 opacity-0 group-hover:opacity-100 '>
              <CameraFilled className='text-gray-200 text-2xl shadow-md' />
            </div>
          </div>
          <div className='ml-2'>
            <Typography className='text-white mb-0.5 font-medium flex items-center'>
              <BorderlessTableOutlined /> {username}
            </Typography>
            <Typography className='text-white text-xs font-normal text-opacity-90'>{biography}</Typography>
          </div>
        </Space>
        {/* <Divider className='my-3 bg-white' /> */}
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
        {isAuth && (
          <div className='flex mt-4 justify-evenly'>
            <PrimaryButton onClick={handleLogout} className='w-32 bg-main-pink hover:opacity-80 border-none text-white'>
              Log out
            </PrimaryButton>
            <PrimaryButton onClick={() => setOpen(true)} className='w-32 hover:opacity-80 text-white'>
              Edit profile
            </PrimaryButton>
          </div>
        )}
      </PrimaryCard>
      <UpdateProfileModal inittialProfile={user} onSubmit={onSubmit} />
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
    </>
  );
}
