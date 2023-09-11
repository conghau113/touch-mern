import { BellFilled, CloseCircleFilled, MessageFilled, QuestionCircleFilled, WechatFilled } from '@ant-design/icons';
import { Dropdown, Image, Menu, MenuProps, message, Space, Typography } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from 'use-media-antd-query';
import { getUser } from '../../apis/service/users';
import logo from '../../assets/logo_touch.png';
import PrimaryButton from '../../components/custom/button/PrimaryButton';
import PrimaryInput from '../../components/custom/input/PrimaryInput';
import PrimarySelect from '../../components/custom/select/PrimarySelect';
import SharedAvatarAuthUser from '../../components/shared/SharedAvatar';
import { isLoggedIn, logoutUser } from '../../helper/authhelper';
import useConversationStore from '../../state/useConversationStore';
import useUserStore from '../../state/useUserStore';

type MenuItem = Required<MenuProps>['items'][number];

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState<boolean>(false);
  const navigate = useNavigate();
  const user = isLoggedIn();
  const username: string = user && isLoggedIn().username;
  const [search, setSearch] = useState('');
  const [searchOpacity, setSearchOpacity] = useState('opacity-90');
  const [profile, setProfile] = useState<any>(null);
  const { setUser, user: UserAuth } = useUserStore();
  const { setCurrent } = useConversationStore();

  async function fetchUser() {
    const data = await getUser({ id: username });
    if (data.error) {
      message.error(data.error);
    } else {
      setProfile(data);
    }
  }

  const isNonMobileScreens = useMediaQuery() !== 'xs';

  const handleSubmit = (e: any) => {
    if (_.size(e.target.value)) {
      navigate('/search?' + new URLSearchParams({ search }));
    }
  };

  const handleLogout = async () => {
    logoutUser();
    navigate('/login');
  };
  useEffect(() => {
    if (username) {
      fetchUser();
    }
  }, [username]);

  useEffect(() => {
    if (!!_.size(profile?.user?.avatar)) {
      setUser({ avatar: profile?.user?.avatar?.[0]?.avatar?.[0]?.url });
    }
  }, [profile]);

  return (
    <div className='flex items-center justify-between w-full bg-main-purple shadow-md fixed z-50'>
      <Space className='flex w-4/12 items-center justify-center'>
        <div
          onClick={() => navigate('/')}
          className='flex items-center cursor-pointer justify-center h-10 w-10 rounded-full bg-white'
        >
          <Image preview={false} width={30} src={logo} />
        </div>
        <Typography
          onClick={() => navigate('/')}
          className='font-bold text-[40px] text-white  text-center cursor-pointer'
        >
          TOUCH!
        </Typography>
      </Space>
      {isNonMobileScreens && (
        <div className='rounded-lg flex items-center justify-between gap-3 py-1 px-4 w-5/12'>
          <PrimaryInput
            className={`rounded-full h-10 bg-white ${searchOpacity}`}
            variant='search-prefix'
            value={search}
            allowClear
            onFocus={() => setSearchOpacity('opacity-unset')}
            onBlur={() => setSearchOpacity('opacity-80')}
            onSubmit={handleSubmit}
            onPressEnter={handleSubmit}
            onClickSearchIcon={(e) => handleSubmit?.(e)}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search posts...'
          />
        </div>
      )}

      {isNonMobileScreens ? (
        <div className='flex gap-12 justify-end items-center w-4/12'>
          <div className='flex items-center opacity-90 gap-2'>
            <WechatFilled
              onClick={() => {
                setCurrent('');
                navigate('/messenger');
              }}
              className='text-xl shadow-lg text-white cursor-pointer p-1.5 hover:rounded-full border-2 border-transparent hover:border-white hover:bg-main-blue'
            />
            <BellFilled className='text-lg shadow-lg text-white cursor-pointer p-1.5 hover:rounded-full border-2 border-transparent hover:border-white hover:bg-main-blue' />
            {/* <QuestionCircleFilled className='text-lg shadow-lg text-white cursor-pointer p-1.5 hover:rounded-full border-2 border-transparent hover:border-white hover:bg-main-blue' /> */}
          </div>

          <Dropdown
            className='cursor-pointer mr-12'
            placement='bottomRight'
            arrow
            trigger={['click']}
            overlay={
              <Menu
                items={
                  [
                    {
                      label: <span onClick={() => navigate(`/users/${username}`)}>Trang cá nhân</span>,
                    },
                    {
                      label: (
                        <Typography className='text-red-500 hover:text-white' onClick={handleLogout}>
                          Log out
                        </Typography>
                      ),
                      danger: true,
                    },
                  ] as MenuItem[]
                }
              />
            }
          >
            <Space>
              <Typography.Text className='text-white text-bold flex items-center'>
                {_.size(username) ? `#${username}` : 'no user'}
              </Typography.Text>
              <SharedAvatarAuthUser
                avatar={!!_.size(UserAuth?.avatar) ? UserAuth?.avatar : undefined}
                userName={username}
              />
            </Space>
          </Dropdown>
        </div>
      ) : (
        <PrimaryButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
          <Menu />
        </PrimaryButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <div className='fixed right-0 bottom-0 h-full z-10 max-w-[500px] min-w-[300px] bg-black'>
          {/* CLOSE ICON */}
          <div className='flex flex-end p-4'>
            <PrimaryButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
              <CloseCircleFilled />
            </PrimaryButton>
          </div>

          {/* MENU ITEMS */}
          <div className='flex flex-col justify-center items-center gap-3'>
            <MessageFilled />
            <BellFilled />
            <QuestionCircleFilled />
            <PrimarySelect>
              <MenuItem>
                <Typography>{_.size(username) ? `${username}` : 'fake name'}</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </PrimarySelect>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
