import { Space } from 'antd';
import PrimaryAvatar from '../../components/custom/avatar/PrimaryAvatar';
import PrimaryCard from '../../components/custom/card/PrimaryCard';
import PrimaryInput from '../../components/custom/input/PrimaryInput';

interface MyPostWidgetProps {
  picturePath: string;
}

export default function MyPostWidget(props: MyPostWidgetProps) {
  const { picturePath } = props ?? {};

  return (
    <PrimaryCard>
      <div className='flex gap-3'>
        <PrimaryAvatar src={<img crossOrigin='anonymous' src={`http://localhost:3001/assets/${picturePath}`} />} />
        <PrimaryInput className='rounded-full' placeholder='Bạn đang nghĩ gì?' />
      </div>
    </PrimaryCard>
  );
}
