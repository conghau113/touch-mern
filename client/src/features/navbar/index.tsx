import {
  BellFilled,
  CaretDownOutlined,
  CloseCircleFilled,
  MessageFilled,
  QuestionCircleFilled,
} from '@ant-design/icons';
import { Dropdown, Menu, MenuProps, Space, Typography } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
import _ from 'lodash';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from 'use-media-antd-query';
import PrimaryButton from '../../components/custom/button/PrimaryButton';
import PrimaryInput from '../../components/custom/input/PrimaryInput';
import PrimarySelect from '../../components/custom/select/PrimarySelect';
import { setLogout } from '../../state';

type MenuItem = Required<MenuProps>['items'][number];

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user: any = useSelector<any>((state) => state.user);
  // console.log('user::', user);

  const isNonMobileScreens = useMediaQuery() !== 'xs';
  console.log('isNonMobileScreens::', isNonMobileScreens);
  const fullName = `${user?.firstName} ${user?.lastName}`;

  return (
    <div className='flex items-center justify-between w-full'>
      <div className='flex items-center justify-around w-1/2'>
        <Typography
          className='font-bold text-[40px] text-center cursor-pointer hover:opacity-80 w-4/12'
          onClick={() => navigate('/home')}
        >
          TOUCH!
        </Typography>
        {isNonMobileScreens && (
          <div className='bg-white rounded-lg flex items-center justify-between gap-3 py-1 px-4 w-8/12'>
            <PrimaryInput placeholder='Search...' />
          </div>
        )}
      </div>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <div className='flex gap-12 justify-end items-center w-1/2 mr-12'>
          {/* <PrimaryButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </PrimaryButton> */}
          <div className='flex items-center opacity-90'>
            <MessageFilled className='text-lg cursor-pointer px-3' />
            <BellFilled className='text-lg cursor-pointer px-3' />
            <QuestionCircleFilled className='text-lg cursor-pointer px-3' />
          </div>

          <Dropdown
            className='cursor-pointer'
            placement='bottomRight'
            overlay={
              <Menu
                items={
                  [
                    {
                      label: <span>Trang cá nhân</span>,
                    },
                    {
                      label: <span onClick={() => dispatch(setLogout())}>Log out</span>,
                      danger: true,
                    },
                  ] as MenuItem[]
                }
              />
            }
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Typography.Text strong>{_.size(user) ? fullName : 'Fake Name'}</Typography.Text>
                <CaretDownOutlined />
              </Space>
            </a>
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
            {/* <IconButton onClick={() => dispatch(setMode())} sx={{ fontSize: '25px' }}>
              {theme.palette.mode === 'dark' ? (
                <DarkMode sx={{ fontSize: '25px' }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: '25px' }} />
              )}
            </IconButton> */}
            <MessageFilled />
            <BellFilled />
            <QuestionCircleFilled />
            <PrimarySelect>
              <MenuItem>
                <Typography>{_.size(user) ? fullName : 'fake name'}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </PrimarySelect>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
