import { AvatarProps } from 'antd';
import _ from 'lodash';
import { tw } from '../../utils/classUtil';
import PrimaryAvatar from '../custom/avatar/PrimaryAvatar';

interface SharedAvatarAuthUserProps extends AvatarProps {
  userName?: string;
  avatar?: string;
}

export default function SharedAvatarAuthUser({ userName, avatar, className, ...restProps }: SharedAvatarAuthUserProps) {
  const url = !!_.size(avatar) ? avatar : `https://robohash.org/${userName}`;
  return (
    <div className='cursor-pointer rounded-full border-main-blue border-2'>
      <PrimaryAvatar {...restProps} variant={`avatar`} className={tw('h-10 w-10', className)} username={url} />
    </div>
  );
}
