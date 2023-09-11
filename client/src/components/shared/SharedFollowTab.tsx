import { Col, Popover, Space, Tabs, TabsProps, Typography } from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUser, getRandomUsers } from '../../apis/service/users';
import ProfileContent from '../../features/profilePage/components/ProfileContent';
import { isLoggedIn } from '../../helper/authhelper';
import PrimaryCard from '../custom/card/PrimaryCard';
import PrimaryEmpty from '../custom/empty/PrimaryEmpty';
import SharedAvatarAuthUser from './SharedAvatar';
import SharedFollowButton from './SharedFollowButton';

interface SharedFollowTabProps {
  user: any;
  fetchUserList?: () => void;
}
export default function SharedFollowTab(props: SharedFollowTabProps) {
  const { user, fetchUserList } = props ?? {};
  const userAuth = isLoggedIn().username;
  const navigate = useNavigate();
  const { followers, following } = user ?? {};
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<any[]>([]);
  const [followersList, setFollowerList] = useState<any[]>([]);
  const [followingList, setFollowingList] = useState<any[]>([]);

  const fetchAllUser = async () => {
    setLoading(true);
    const data = await getRandomUsers({ size: 20 });
    setUsers(data);
    setLoading(false);
  };

  console.log('user', user, users);

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Follower',
      children: (
        <>
          {!!_.size(followersList) &&
            (_.size(followersList) > 0 ? (
              _.map(followersList, (user, index) => {
                return (
                  <Col span={24} key={user.username}>
                    <Space className='border-b-[0.5px] py-1  border-gray-400 group w-full flex justify-between'>
                      <Popover
                        destroyTooltipOnHide
                        placement='right'
                        content={
                          <div className='w-[400px]'>
                            <ProfileContent isHover={true} onSubmit={() => {}} profile={{ user }} />
                          </div>
                        }
                      >
                        <Space
                          onClick={() => navigate(`/users/${user.username}`)}
                          className='group:hover:border-white cursor-pointer'
                        >
                          <SharedAvatarAuthUser
                            avatar={!!_.size(user?.avatar) ? user?.avatar?.[0]?.avatar?.[0]?.url : undefined}
                            userName={user?.username}
                          />
                          <div className='flex flex-col'>
                            <Typography className='text-white text-sm'>{user.fullName}</Typography>
                            <Typography className='text-white text-xs'>#{user.username}</Typography>
                          </div>
                        </Space>
                      </Popover>
                      <Space>
                        <SharedFollowButton
                          fetchUserList={fetchUserList}
                          iconClassname={'text-white'}
                          followingUserId={user?._id}
                          username={user?.username}
                        />
                      </Space>
                    </Space>
                  </Col>
                );
              })
            ) : (
              <>
                <PrimaryEmpty />
              </>
            ))}
        </>
      ),
    },
    {
      key: '2',
      label: 'Following',
      children: (
        <>
          {!!_.size(followingList) &&
            (_.size(followingList) > 0 ? (
              _.map(followingList, (user, index) => {
                return (
                  <Col span={24} key={user.username}>
                    <Space className='border-b-[0.5px] py-1  border-gray-400 group w-full flex justify-between'>
                      <Popover
                        destroyTooltipOnHide
                        placement='right'
                        content={
                          <div className='w-[400px]'>
                            <ProfileContent isHover={true} onSubmit={() => {}} profile={{ user }} />
                          </div>
                        }
                      >
                        <Space
                          onClick={() => navigate(`/users/${user.username}`)}
                          className='group:hover:border-white cursor-pointer'
                        >
                          <SharedAvatarAuthUser
                            avatar={!!_.size(user?.avatar) ? user?.avatar?.[0]?.avatar?.[0]?.url : undefined}
                            userName={user?.username}
                          />
                          <div className='flex flex-col'>
                            <Typography className='text-white text-sm'>{user.fullName}</Typography>
                            <Typography className='text-white text-xs'>#{user.username}</Typography>
                          </div>
                        </Space>
                      </Popover>
                      <Space>
                        <SharedFollowButton
                          fetchUserList={fetchUserList}
                          iconClassname={'text-white'}
                          followingUserId={user?._id}
                          username={user?.username}
                        />
                      </Space>
                    </Space>
                  </Col>
                );
              })
            ) : (
              <>
                <PrimaryEmpty />
              </>
            ))}
        </>
      ),
    },
  ];

  useEffect(() => {
    fetchAllUser();
  }, [user]);

  //   follower
  useEffect(() => {
    const formatUser = _.map(followers, (item) => {
      return {
        _id: item,
      };
    });
    const getFollowers = _.intersectionBy(users, formatUser, '_id');
    setFollowerList(getFollowers);
    console.log('getFollowers::', getFollowers);
  }, [followers]);

  //   following
  useEffect(() => {
    const formatUser = _.map(following, (item) => {
      return {
        _id: item,
      };
    });
    const getFollowers = _.intersectionBy(users, formatUser, '_id');
    setFollowingList(getFollowers);
    console.log('setFollowingList::', getFollowers);
  }, [following]);

  return (
    <PrimaryCard className='bg-main-purple pt-0 [&_.ant-tabs-tab-btn]:text-main-light [&_.ant-tabs-tab-btn]:text-opacity-90 [&_.ant-tabs-nav]:before:border-dashed'>
      <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
    </PrimaryCard>
  );
}
