import { FileImageOutlined } from '@ant-design/icons';
import { CardProps } from 'antd';
import _ from 'lodash';
import PrimaryButton from '../../../components/custom/button/PrimaryButton';
import PrimaryCard from '../../../components/custom/card/PrimaryCard';
import PrimaryInput from '../../../components/custom/input/PrimaryInput';
import SharedAvatarAuthUser from '../../../components/shared/SharedAvatar';
import useUserStore from '../../../state/useUserStore';

interface MyPostWidgetProps extends CardProps {
  picturePath?: string;
  username: string;
}

export default function MyPostWidget(props: MyPostWidgetProps) {
  const { username, ...restProps } = props ?? {};
  const { user } = useUserStore();
  return (
    <PrimaryCard {...restProps} variant='no-spacing' className='px-4 pt-4 pb-2 bg-white border border-main-purple'>
      <div className='flex items-center gap-3'>
        <div>
          <SharedAvatarAuthUser avatar={!!_.size(user?.avatar) ? user?.avatar : undefined} userName={username} />
        </div>
        <PrimaryInput
          readOnly
          className='h-11 rounded-full border-dashed border-main-purple'
          placeholder='What are you thinking!'
        />
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
