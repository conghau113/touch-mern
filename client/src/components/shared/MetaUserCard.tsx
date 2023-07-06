import { SettingOutlined, UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { ReactElement } from 'react';
import { EUserIcon } from '../../enums/EUserIcon';
import PrimaryAvatar from '../custom/avatar/PrimaryAvatar';

interface MetaUserCardProps {
  fullName: string;
  friends: any[];
  picturePath: string;
  userIcon: EUserIcon;
}

export default function MetaUserCard(props: MetaUserCardProps) {
  const { fullName, friends, picturePath, userIcon } = props;

  switch (userIcon) {
    case EUserIcon.Setting:
      return <SettingOutlined />;
    case EUserIcon.Add:
      return <UserAddOutlined />;
    case EUserIcon.Sub:
      return <UserDeleteOutlined />;
    default:
      break;
  }

  return (
    <div>
      <PrimaryAvatar src={`http://localhost:3001/assets/${picturePath}`} />
      <div>
        <Typography>{fullName}</Typography>
        <Typography>{friends.length} friends</Typography>
      </div>
      {userIcon}
    </div>
  );
}
