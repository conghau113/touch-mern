import { SettingOutlined, UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { Col, Row, Space, Typography } from 'antd';
import _ from 'lodash';
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
  const { fullName, friends, picturePath, userIcon } = props ?? {};

  switch (userIcon) {
    case EUserIcon.Setting:
      return (
        <div className=''>
          <Row>
            <Col span={22} className='flex gap-4 items-center'>
              <PrimaryAvatar
                src={<img crossOrigin='anonymous' src={`http://localhost:3001/assets/${picturePath}`} />}
              />
              <Space className='flex-col items-start gap-0'>
                <Typography className='text-black font-bold'>{fullName}</Typography>
                <Typography className='text-xs'>{friends?.length} friends</Typography>
              </Space>
            </Col>
            <Col span={2} className='flex justify-center items-center cursor-pointer hover:opacity-70'>
              <SettingOutlined />
            </Col>
          </Row>
        </div>
      );
    case EUserIcon.Add:
      return (
        <Row>
          <Col span={22} className='flex gap-4 items-center'>
            <PrimaryAvatar src={<img crossOrigin='anonymous' src={`http://localhost:3001/assets/${picturePath}`} />} />
            <Space className='flex-col items-start gap-0'>
              <Typography className='text-black font-bold'>{fullName}</Typography>
              <Typography className='text-xs'>{friends?.length} friends</Typography>
            </Space>
          </Col>
          <Col span={2} className='flex justify-center items-center cursor-pointer hover:opacity-70'>
            <UserAddOutlined />
          </Col>
        </Row>
      );
    case EUserIcon.Sub:
      return (
        <Row>
          <Col span={22} className='flex gap-4 items-center'>
            <PrimaryAvatar src={<img crossOrigin='anonymous' src={`http://localhost:3001/assets/${picturePath}`} />} />
            <Space className='flex-col items-start gap-0'>
              <Typography className='text-black font-bold'>{fullName}</Typography>
              <Typography className='text-xs'>{friends?.length} friends</Typography>
            </Space>
          </Col>
          <Col span={2} className='flex justify-center items-center cursor-pointer hover:opacity-70'>
            <UserDeleteOutlined />
          </Col>
        </Row>
      );
    default:
      return <></>;
  }
}
