import { FileImageOutlined } from '@ant-design/icons';
import { CardProps } from 'antd';
import PrimaryButton from '../../../components/custom/button/PrimaryButton';
import PrimaryCard from '../../../components/custom/card/PrimaryCard';
import PrimaryInput from '../../../components/custom/input/PrimaryInput';
import SharedAvatarAuthUser from '../../../components/shared/SharedAvatar';

interface MyPostWidgetProps extends CardProps {
  picturePath?: string;
  username: string;
}

export default function MyPostWidget(props: MyPostWidgetProps) {
  const { username, ...restProps } = props ?? {};
  return (
    <PrimaryCard {...restProps} variant='no-spacing' className='px-4 pt-4 pb-2 bg-main-light'>
      <div className='flex items-center gap-3'>
        <div>
          <SharedAvatarAuthUser />
        </div>
        <PrimaryInput readOnly className='h-10 rounded-full' placeholder='Bạn đang nghĩ gì?' />
      </div>
      <div className='flex justify-end items-center w-full mt-2 gap-3'>
        {/* <div className='w-1/2 cursor-pointer hover:opacity-60 hover:bg-gray-100 flex justify-center  py-2.5'>
          <VideoCameraAddOutlined className=' text-xl' />
        </div> */}
        <div className='w-8 h-8 flex items-center justify-center rounded-full bg-main-purple hover:scale-105 cursor-pointer'>
          <FileImageOutlined className='text-sm text-main-light' />
        </div>
        <PrimaryButton variant='primary' className='px-8 h-9 w-28 '>
          Create post
        </PrimaryButton>
      </div>
    </PrimaryCard>
  );
}
