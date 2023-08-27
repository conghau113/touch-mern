import { WechatFilled } from '@ant-design/icons';
import { Divider, Spin } from 'antd';
import Typography from 'antd/es/typography/Typography';
import _ from 'lodash';
import UserConversationEntry from './userConversationEntry';

interface UserMessengerEntriesProps {
  loading: boolean;
  conversations: any[];
  conservant: any;
  setConservant: any;
}

export default function UserMessengerEntries(props: UserMessengerEntriesProps) {
  const { loading, conversations, conservant } = props ?? {};
  return !loading ? (
    <>
      {!!_.size(conversations) ? (
        <div>
          <div className='flex items-center'>
            <WechatFilled />
            <Typography>Your conversations</Typography>
          </div>
          <Divider />
          <div>
            {_.map(conversations, (conversation) => {
              return (
                <UserConversationEntry
                  conservant={conservant}
                  conversation={conversation}
                  // key={conversation.recipient.username}
                  setConservant={props.setConservant}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-center gap-2 h-full'>
          <Typography>No Conversations</Typography>
          <Typography color='text.secondary max-w-[70%]'>
            Click 'Message' on another user's profile to start a conversation
          </Typography>
        </div>
      )}
    </>
  ) : (
    <Spin className='h-full' spinning={loading}></Spin>
  );
}
