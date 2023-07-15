import { HeartFilled, SmileFilled } from '@ant-design/icons';
import { Col, FloatButton, Menu, MenuProps, message, Row, Space } from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getUser } from '../../apis/service/users';
import Backdrop from '../../components/custom/backdrop/Backdrop';
import PrimaryCard from '../../components/custom/card/PrimaryCard';
import SharedFindUsers from '../../components/shared/SharedFindUsers';
import { EContentType } from '../../enums/EContentType';
import { isLoggedIn } from '../../helper/authhelper';
import useBackdropStore from '../../state/useBackdropStore';
import HomePage from '../homePage';
import Navbar from '../navbar';
import ProfileContent from './components/ProfileContent';
import { EProfile } from './enum/EProfile';

const ProfilePage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<any>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [tab, setTab] = useState<EProfile>(EProfile.Posts);
  const user = isLoggedIn();
  const params: any = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { setOpenBackdrop } = useBackdropStore();

  const fetchUser = async () => {
    setOpenBackdrop(true);
    setLoading(true);
    const data = await getUser(params);
    setOpenBackdrop(false);
    setLoading(false);
    if (data.error) {
      message.error(data.error);
    } else {
      setProfile(data);
    }
  };

  const items: MenuProps['items'] = [
    {
      label: (
        <Space>
          <SmileFilled /> Posts
        </Space>
      ),
      key: EProfile.Posts,
    },
    {
      label: (
        <Space>
          <HeartFilled /> Likes
        </Space>
      ),
      key: EProfile.Likes,
    },
    // {
    //   label: 'Comments',
    //   key: EProfile.Comments,
    // },
  ];

  useEffect(() => {
    fetchUser();
  }, [location, params]);

  return (
    <>
      <Row>
        <Col span={24}>
          <Navbar />
        </Col>

        <Col span={24} className='px-8'>
          <Row gutter={[24, 0]} className='mt-20 '>
            <Col span={6}>
              <ProfileContent profile={profile} />
            </Col>
            <Col span={12}>
              <PrimaryCard className='p-0 bg-transparent'>
                <Menu
                  className='bg-main-purple flex justify-center text-main-light [&_.ant-menu-item]:hover:text-main-light rounded-t-xl'
                  onClick={(e: any) => setTab(e.key)}
                  selectedKeys={[tab]}
                  mode='horizontal'
                  items={items}
                />
                {profile ? (
                  <>
                    {_.includes(EProfile.Posts, tab) && (
                      <HomePage
                        propfile={profile}
                        isCreatePost={_.includes(params.id, user.username)}
                        profileUser={profile.user}
                        contentType={EContentType.Posts}
                        key={EContentType.Posts}
                      />
                    )}
                    {_.includes(EProfile.Likes, tab) && (
                      <HomePage
                        propfile={profile}
                        profileUser={profile.user}
                        contentType={EContentType.Liked}
                        key={EContentType.Liked}
                      />
                    )}
                  </>
                ) : null}
              </PrimaryCard>
            </Col>
            <Col span={6}>
              <SharedFindUsers />
            </Col>
          </Row>
        </Col>
      </Row>
      <Backdrop />
      <FloatButton.BackTop />
    </>
  );
};

export default ProfilePage;
