import { AvatarProps } from 'antd';
import _ from 'lodash';
import { isLoggedIn } from '../../helper/authhelper';
import { tw } from '../../utils/classUtil';
import PrimaryAvatar from '../custom/avatar/PrimaryAvatar';

interface SharedAvatarAuthUserProps extends AvatarProps {
  userName?: string;
}

export default function SharedAvatarAuthUser({ userName, className, ...restProps }: SharedAvatarAuthUserProps) {
  const user = isLoggedIn() ?? '';
  const username = user && isLoggedIn().username;
  return (
    <div className='cursor-pointer rounded-full border-main-blue border-2'>
      <PrimaryAvatar
        {...restProps}
        variant='image'
        className={tw('h-10 w-10', className)}
        username={_.size(userName) ? userName : username}
      />
    </div>
  );
}
