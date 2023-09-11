import { Space, Typography } from 'antd';
import dayjs from 'dayjs';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import PrimaryTooltip from '../../../components/custom/tooltip/PrimaryTooltip';
import SharedAvatarAuthUser from '../../../components/shared/SharedAvatar';

interface MessageProps {
  conservant: any;
  message: any;
}

export default function Message(props: MessageProps) {
  const navigate = useNavigate();
  const username = props.conservant.username;
  const message = props.message;
  // console.log('message::', message);

  let styles: any = {};
  if (message.direction === 'to') {
    styles = {
      justifyContent: 'justify-start',
    };
  } else if (message.direction === 'from') {
    styles = {
      messageColor: 'gray-100',
      justifyContent: 'justify-end',
    };
  }

  return (
    <>
      <div className={`flex items-start  gap-2 py-1 w-full ${styles?.justifyContent} `}>
        {message.direction === 'to' && (
          <Space onClick={() => navigate(`/users/${props.conservant.username}`)}>
            <SharedAvatarAuthUser
              className='h-8 w-8 text-white flex items-start border-0'
              avatar={
                !!_.size(props?.conservant?.avatar) ? props?.conservant?.avatar?.[0]?.avatar?.[0]?.url : undefined
              }
              userName={props?.conservant?.username}
            />
          </Space>
        )}
        <PrimaryTooltip
          placement={`${message.direction === 'to' ? 'topLeft' : 'topRight'}`}
          destroyTooltipOnHide
          title={`${dayjs(props?.conservant?.createdAt).format('HH:mm DD-MM-YYYY')}`}
        >
          <Typography className='rounded-lg bg-gray-100 border py-2 max-h-70% max-w-[80%] px-2 whitespace-pre-line'>
            {_.map(message?.content.split(/(https?:\/\/[^\s]+)/g), (part, index) => {
              if (part.match(/https?:\/\/[^\s]+/)) {
                return (
                  <a
                    className='text-blue-5 hover:text-opacity-80'
                    key={index}
                    href={part}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {part}
                  </a>
                );
              } else {
                return part;
              }
            })}
          </Typography>
        </PrimaryTooltip>
      </div>
    </>
  );
}
