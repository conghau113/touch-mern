import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { message, Space, Typography } from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { followUser, getUser, unFollow } from '../../apis/service/users';
import { isLoggedIn } from '../../helper/authhelper';
import { tw } from '../../utils/classUtil';
import PrimaryTooltip from '../custom/tooltip/PrimaryTooltip';

interface SharedFollowButtonProps {
  followingUserId: any;
  username: string;
  iconClassname?: string;
  fetchUserList?: () => void;
}

export default function SharedFollowButton(props: SharedFollowButtonProps) {
  const { followingUserId, username, iconClassname, fetchUserList } = props ?? {};
  const user = isLoggedIn();

  const [follow, setFollow] = useState<boolean>(false);
  const [profile, setProfile] = useState<any>(null);
  const [load, setLoad] = useState<boolean>(false);

  async function fetchUser() {
    const data = await getUser({ id: username });
    if (data.error) {
      message.error(data.error);
    } else {
      setProfile(data);
    }
  }

  const handleFollow = async () => {
    if (load) return;

    setFollow(true);
    setLoad(true);
    await await followUser(followingUserId, user);
    fetchUserList?.();
    setLoad(false);
    message.success('Follow success!');
  };
  const handleUnFollow = async () => {
    if (load) return;
    setFollow(false);
    setLoad(true);
    await await unFollow(followingUserId, user);
    fetchUserList?.();
    setLoad(false);
    message.success('Unfollow success!');
  };

  useEffect(() => {
    if (_.find(profile?.user?.followers, (item) => item === user.userId)) {
      setFollow(true);
    }
    return () => setFollow(false);
  }, [profile?.user?.followers, user.userId]);

  useEffect(() => {
    if (username) {
      fetchUser();
    }
  }, [username]);

  // useEffect(() => {
  //   fetchUserList?.();
  // }, [follow]);

  return (
    <Space>
      {!follow ? (
        <PrimaryTooltip title='Follow'>
          <Typography onClick={handleFollow}>
            <PrimaryTooltip className='mr-4 cursor-pointer hover:opacity-70'>
              <UserAddOutlined className={tw('text-base text-main-purple', iconClassname)} />
            </PrimaryTooltip>
          </Typography>
        </PrimaryTooltip>
      ) : (
        <PrimaryTooltip title='Unfollow'>
          <Typography onClick={handleUnFollow}>
            <PrimaryTooltip className='mr-4 cursor-pointer hover:opacity-70'>
              <UserDeleteOutlined className={tw('text-base', iconClassname)} />
            </PrimaryTooltip>
          </Typography>
        </PrimaryTooltip>
      )}
    </Space>
  );
}
