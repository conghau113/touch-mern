import { WechatFilled } from '@ant-design/icons';
import { Spin } from 'antd';
import Typography from 'antd/es/typography/Typography';
import _ from 'lodash';
import { useState } from 'react';
import PrimaryEmpty from '../../../components/custom/empty/PrimaryEmpty';
import useConversationStore from '../../../state/useConversationStore';
import UserConversationEntry from './userConversationEntry';

interface UserMessengerEntriesProps {
  loading: boolean;
  conversations: any[];
  conservant: any;
  setConservant: any;
}

export default function UserMessengerEntries(props: UserMessengerEntriesProps) {
  const { loading } = props ?? {};
  const { current, setCurrent } = useConversationStore();
  return (
    <Spin className='h-full' spinning={loading}>
      <div className='h-full'>
        {!!_.size(props.conversations) ? (
          <div className='w-auto '>
            <div className='flex hideHead items-center justify-center h-12 border-b border-main-light border-dashed mb-2'>
              <WechatFilled className='text-xl' />
              <Typography className='text-white text-lg font-bold ml-2'>Chat</Typography>
            </div>
            <div>
              {_.map(props.conversations, (conversation) => {
                return (
                  <UserConversationEntry
                    current={current}
                    setCurrent={setCurrent}
                    conservant={props.conservant}
                    conversation={conversation}
                    key={conversation.recipient.username}
                    setConservant={props.setConservant}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center gap-2 h-full'>
            <PrimaryEmpty
              description={
                <>
                  <Typography className='text-white'>No Conversations</Typography>
                </>
              }
            />
          </div>
        )}
      </div>
    </Spin>
  );
}
