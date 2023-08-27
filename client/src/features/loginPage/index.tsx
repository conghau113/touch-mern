import { Divider, Image, Space, Typography } from 'antd';
import PrimaryCard from '../../components/custom/card/PrimaryCard';
import LoginAndRegisterForm from './components/LoginAndRegisterForm';
import logo from '../../assets/logo_touch.png';

const LoginPage = () => {
  return (
    <>
      <Space className='flex w-4full bg-main-purple items-center justify-center cursor-pointer'>
        <div className='flex items-center justify-center h-10 w-10 rounded-full bg-white'>
          <Image preview={false} width={30} src={logo} />
        </div>
        <Typography className='font-bold text-[40px] text-white  text-center cursor-pointer'>TOUCH!</Typography>
      </Space>
      <div className='w-5/12 m-auto my-5'>
        <PrimaryCard className='bg-white shadow-sm '>
          <Typography className='font-bold text-2xl text-center text-main-purple'>Welcome To Touch!</Typography>
          <div className='w-8/12 m-auto '>
            <Divider className='my-3 opacity-20 bg-main-purple shadow-sm' />
          </div>
          <LoginAndRegisterForm />
        </PrimaryCard>
      </div>
    </>
  );
};

export default LoginPage;
