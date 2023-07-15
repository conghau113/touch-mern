import {
  BookOutlined,
  BorderlessTableOutlined,
  EnvironmentOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Col, Divider, Row, Space } from 'antd';
import Typography from 'antd/es/typography/Typography';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../../components/custom/button/PrimaryButton';
import PrimaryCard from '../../../components/custom/card/PrimaryCard';
import SharedAvatarAuthUser from '../../../components/shared/SharedAvatar';
import { logoutUser } from '../../../helper/authhelper';

interface ProfileContentPorps {
  profile: any;
}

export default function ProfileContent(props: ProfileContentPorps) {
  const { profile } = props ?? {};
  const { user } = profile ?? {};
  const { username, biography, email, fullName, location, occupation } = user ?? {};
  const navigate = useNavigate();

  const handleLogout = async () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <PrimaryCard className=' bg-main-purple '>
      <Space className='mb-1'>
        <div className=' flex items-center justify-center w-full '>
          <SharedAvatarAuthUser userName={username} className='w-16 h-16' />
        </div>
        <div className='ml-2'>
          <Typography className='text-main-light mb-0.5 font-medium flex items-center'>
            <BorderlessTableOutlined /> {username}
          </Typography>
          <Typography className='text-main-light text-xs font-normal'>{'Đây là biography'}</Typography>
        </div>
      </Space>
      {/* <Divider className='my-3 bg-main-light' /> */}
      <PrimaryCard className='flex border-dashed bg-transparent flex-wrap flex-col gap-2 mt-3'>
        <div className='flex gap-3'>
          <UserOutlined className='text-main-light flex items-center' />
          <Typography className='text-main-light text-center font-normal'>{fullName}</Typography>
        </div>
        <div className='flex gap-3'>
          <MailOutlined className='text-main-light flex items-center' />
          <Typography className='text-main-light text-center font-normal'>{email}</Typography>
        </div>
        <div className='flex gap-3'>
          <EnvironmentOutlined className='text-main-light flex items-center' />
          <Typography className='text-main-light text-center font-normal'>{location}</Typography>
        </div>
        <div className='flex gap-3'>
          <BookOutlined className='text-main-light flex items-center' />
          <Typography className='text-main-light text-center font-normal'>{occupation}</Typography>
        </div>
      </PrimaryCard>
      <div className='flex mt-4 justify-evenly'>
        <PrimaryButton
          onClick={handleLogout}
          className='w-32 bg-main-pink hover:opacity-80 border-none text-main-light'
        >
          Log out
        </PrimaryButton>
        <PrimaryButton className='w-32 hover:opacity-80 text-main-purple'>Edit profile</PrimaryButton>
      </div>
    </PrimaryCard>
  );
}
