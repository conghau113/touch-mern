import { BellFilled, CloseCircleFilled, MessageFilled, QuestionCircleFilled, WechatFilled } from '@ant-design/icons';
import { Dropdown, Image, Menu, MenuProps, Space, Typography } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
import _ from 'lodash';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from 'use-media-antd-query';
import logo from '../../assets/logo_touch.png';
import PrimaryButton from '../../components/custom/button/PrimaryButton';
import PrimaryInput from '../../components/custom/input/PrimaryInput';
import PrimarySelect from '../../components/custom/select/PrimarySelect';
import SharedAvatarAuthUser from '../../components/shared/SharedAvatar';
import { isLoggedIn, logoutUser } from '../../helper/authhelper';

type MenuItem = Required<MenuProps>['items'][number];

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState<boolean>(false);
  const navigate = useNavigate();
  const user = isLoggedIn();
  const username = user && isLoggedIn().username;
  const [search, setSearch] = useState('');
  const [searchOpacity, setSearchOpacity] = useState('opacity-80');

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

  return (
    <div className='flex items-center justify-between w-full bg-main-purple shadow-md fixed z-50'>
      <Space className='flex w-4/12 items-center justify-center'>
        <div
          onClick={() => navigate('/')}
          className='flex items-center cursor-pointer justify-center h-10 w-10 rounded-full bg-main-light'
        >
          <Image preview={false} width={30} src={logo} />
        </div>
        <Typography
          onClick={() => navigate('/')}
          className='font-bold text-[40px] text-main-light  text-center cursor-pointer'
        >
          TOUCH!
        </Typography>
      </Space>
      {isNonMobileScreens && (
        <div className='rounded-lg flex items-center justify-between gap-3 py-1 px-4 w-5/12'>
          <PrimaryInput
            className={`rounded-full h-10 bg-main-light ${searchOpacity}`}
            variant='search-prefix'
            value={search}
            allowClear
            // onFocus={() => setSearchOpacity('opacity-unset')}
            // onBlur={() => setSearchOpacity('opacity-80')}
            onSubmit={handleSubmit}
            onPressEnter={handleSubmit}
            onClickSearchIcon={(e) => handleSubmit?.(e)}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search...'
          />
        </div>
      )}

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <div className='flex gap-12 justify-end items-center w-4/12'>
          {/* <PrimaryButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </PrimaryButton> */}
          <div className='flex items-center opacity-90 gap-2'>
            <WechatFilled className='text-xl shadow-lg text-main-light cursor-pointer p-1.5 hover:rounded-full border-2 border-transparent hover:border-white hover:bg-main-blue' />
            <BellFilled className='text-lg shadow-lg text-main-light cursor-pointer p-1.5 hover:rounded-full border-2 border-transparent hover:border-white hover:bg-main-blue' />
            <QuestionCircleFilled className='text-lg shadow-lg text-main-light cursor-pointer p-1.5 hover:rounded-full border-2 border-transparent hover:border-white hover:bg-main-blue' />
          </div>

          <Dropdown
            className='cursor-pointer mr-12'
            placement='bottomRight'
            arrow
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
            <Space onClick={() => navigate(`/users/${username}`)}>
              <Typography.Text className='text-main-light text-bold'>
                {_.size(username) ? `${username}` : 'no user'}
              </Typography.Text>
              <SharedAvatarAuthUser />
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
