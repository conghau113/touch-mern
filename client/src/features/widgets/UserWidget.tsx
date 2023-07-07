import {
  BookOutlined,
  EnvironmentOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Divider, Space } from 'antd';
import Typography from 'antd/es/typography/Typography';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PrimaryCard from '../../components/custom/card/PrimaryCard';
import MetaUserCard from '../../components/shared/MetaUserCard';
import { EUserIcon } from '../../enums/EUserIcon';
import { RootState } from '../../state/store';

interface UserWidgetProps {
  userId: any;
  picturePath: string;
}

export default function UserWidget(props: UserWidgetProps) {
  const { userId, picturePath } = props ?? {};

  const [user, setUser] = useState<any | null>(null);
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.token);
  console.log('token::', token);
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('response::', response);
    const data = await response.json();
    setUser(data);
  };

  const { firstName, lastName, location, occupation, viewedProfile, impressions, email, friends } = user ?? {};
  console.log('firstName, lastName::', firstName, lastName);
  useEffect(() => {
    getUser();
  }, []);

  return (
    <PrimaryCard className='shadow-sm'>
      <MetaUserCard
        friends={friends}
        fullName={`${lastName} ${firstName}`}
        picturePath={picturePath}
        userIcon={EUserIcon.Setting}
      />
      <Divider className='my-3' />
      <div className='flex flex-col gap-2'>
        <Space>
          <MailOutlined className='text-lg flex items-center' />
          <Typography>{email}</Typography>
        </Space>
        <Space>
          <EnvironmentOutlined className='text-lg flex items-center' />
          <Typography>{location}</Typography>
        </Space>
        <Space>
          <BookOutlined className='text-lg flex items-center' />
          <Typography>{occupation}</Typography>
        </Space>
      </div>
      <Divider className='my-3' />
      <Typography>Social</Typography>
      <div className='flex flex-col gap-2 mt-1'>
        <Space>
          <InstagramOutlined className='text-lg flex items-center' />
          <Typography>Instagram</Typography>
        </Space>
        <Space>
          <LinkedinOutlined className='text-lg flex items-center' />
          <Typography>LinkedIn</Typography>
        </Space>
      </div>
    </PrimaryCard>
  );
}
