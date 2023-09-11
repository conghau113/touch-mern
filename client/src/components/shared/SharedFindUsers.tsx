import { EyeFilled, SyncOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Col, Divider, Popover, Row, Skeleton, Space, Spin, Typography } from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRandomUsers } from '../../apis/service/users';
import ProfileContent from '../../features/profilePage/components/ProfileContent';
import { isLoggedIn } from '../../helper/authhelper';
import PrimaryButton from '../custom/button/PrimaryButton';
import PrimaryCard from '../custom/card/PrimaryCard';
import PrimaryEmpty from '../custom/empty/PrimaryEmpty';
import SharedAvatarAuthUser from './SharedAvatar';
import SharedFollowButton from './SharedFollowButton';

export default function SharedFindUsers() {
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<any[]>([]);
  const navigate = useNavigate();
  const userAuth = isLoggedIn().username;

  const fetchUsers = async () => {
    setLoading(true);
    const data = await getRandomUsers({ size: 6 });
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClick = () => {
    fetchUsers();
  };

  return (
    <PrimaryCard className='bg-main-purple  border-white  p-4 pt-2 '>
      <div className='flex justify-between'>
        <Typography className='text-lg flex items-center gap-2 font-medium text-white'>
          {/* <Space className='bg-white w-6 h-6 rounded-full flex items-center justify-center'> */}
          <UsergroupAddOutlined className='text-white text-lg' />
          {/* </Space> */}
          <span>OTHER USERS</span>
        </Typography>
        <PrimaryButton
          shape='circle'
          className='bg-transparent flex items-center hover:opacity-70 text-main-purple justify-center'
          onClick={() => handleClick()}
        >
          <SyncOutlined className='text-white' />
        </PrimaryButton>
      </div>
      <Divider className='my-2 bg-white' />
      <Spin spinning={loading}>
        <Row gutter={[12, 4]} className='mt-4'>
          {
            _.size(users) > 0 ? (
              _.map(
                _.filter(users, (user) => user.username !== userAuth),
                (user, index) => {
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
                            iconClassname={'text-white'}
                            followingUserId={user?._id}
                            username={user?.username}
                          />
                        </Space>
                      </Space>
                    </Col>
                  );
                }
              )
            ) : (
              <>
                <PrimaryEmpty />
              </>
            )
            // <Col span={24}>
            //   <div className='mt-2 flex justify-center w-full  items-center'>
            //     <div className='w-full'>
            //       {_.map(Array(10), (item) => {
            //         return <Skeleton key={item} active avatar paragraph={{ rows: 0 }} />;
            //       })}
            //     </div>
            //   </div>
            // </Col>
          }
        </Row>
      </Spin>
    </PrimaryCard>
  );
}
