import { EyeFilled, SyncOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Col, Divider, Row, Skeleton, Space, Typography } from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRandomUsers } from '../../apis/service/users';
import { isLoggedIn } from '../../helper/authhelper';
import PrimaryButton from '../custom/button/PrimaryButton';
import PrimaryCard from '../custom/card/PrimaryCard';
import PrimaryEmpty from '../custom/empty/PrimaryEmpty';
import SharedAvatarAuthUser from './SharedAvatar';

export default function SharedFindUsers() {
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<any[]>([]);
  const navigate = useNavigate();
  const userAuth = isLoggedIn().username;

  const fetchUsers = async () => {
    setLoading(true);
    const data = await getRandomUsers({ size: 10 });
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
    <PrimaryCard className='bg-main-purple  border-main-light  p-4 pt-2 '>
      <div className='flex justify-between'>
        <Typography className='text-lg flex items-center gap-2 font-medium text-main-light'>
          {/* <Space className='bg-main-light w-6 h-6 rounded-full flex items-center justify-center'> */}
          <UsergroupAddOutlined className='text-main-light text-lg' />
          {/* </Space> */}
          <span>Other user</span>
        </Typography>
        <PrimaryButton className='bg-main-light flex items-center text-main-purple' onClick={() => handleClick()}>
          <SyncOutlined />
          Find
        </PrimaryButton>
      </div>
      <Divider className='my-2 bg-main-light' />
      <Row gutter={[12, 4]} className='mt-4'>
        {!loading ? (
          _.size(users) > 0 ? (
            _.map(
              _.filter(users, (user) => user.username !== userAuth),
              (user, index) => {
                return (
                  <Col span={24} key={user.username}>
                    <Space className='border-b-2 py-1 last:border-b-0 border-main-light w-full flex justify-between'>
                      <Space>
                        <SharedAvatarAuthUser userName={user.username} />
                        <Typography className='text-main-light text-sm'>{user.username}</Typography>
                      </Space>
                      <Space
                        onClick={() => navigate(`/users/${user.username}`)}
                        className='hover:bg-main-blue text-main-light hover:text-main-purple w-12 h-8 cursor-pointer rounded-full flex items-center justify-center border mr-4 '
                      >
                        <EyeFilled className='' />
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
        ) : (
          <Col span={24}>
            <div className='mt-2 flex justify-center w-full  items-center'>
              <div className='w-full'>
                {_.map(Array(4), (item) => {
                  return <Skeleton key={item} active avatar paragraph={{ rows: 0 }} />;
                })}
              </div>
            </div>
          </Col>
        )}
      </Row>
    </PrimaryCard>
  );
}
