import { Divider, Image, Typography } from 'antd';
import PrimaryCard from '../../components/custom/card/PrimaryCard';
import LoginAndRegisterForm from './components/LoginAndRegisterForm';

const LoginPage = () => {
  return (
    <>
      <div className='w-5/12 m-auto my-5'>
        <PrimaryCard className='bg-blue-50 shadow-sm '>
          <Typography className='font-bold text-2xl text-center text-blue-950'>Welcome To Touch!</Typography>
          <div className='w-8/12 m-auto '>
            <Divider className='my-3 opacity-20 bg-purple-900 shadow-sm' />
          </div>
          <LoginAndRegisterForm />
        </PrimaryCard>
      </div>
    </>
  );
};

export default LoginPage;
