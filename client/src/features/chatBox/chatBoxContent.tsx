import { CloseOutlined, WechatFilled } from '@ant-design/icons';
import { Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getConversations } from '../../apis/service/messages';
import { isLoggedIn } from '../../helper/authhelper';
import useConversationStore from '../../state/useConversationStore';
import Messages from '../messengerPage/components/messages';
import UserMessengerEntries from '../messengerPage/components/userMessengerEntries';
import useChatBoxStore from './store/useChatBoxStore';

export default function ChatBoxContent() {
  // const [isOpenListUser, setOpenListUser] = useState<boolean>(false);
  const [conservant, setConservant] = useState(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const user = isLoggedIn();
  const { state } = useLocation();
  const newConservant = state && state.user;
  const { isOpenConversation, setOpenConversation, isOpenListUser, setOpenListUser } = useChatBoxStore();
  const { setCurrent } = useConversationStore();

  const getConversation = (conversations: string | any[], conservantId: any) => {
    for (let i = 0; i < conversations.length; i++) {
      const conversation = conversations[i];
      if (conversation.recipient._id === conservantId) {
        return conversation;
      }
    }
  };

  const fetchConversations = async () => {
    let conversations = await getConversations(user);
    if (newConservant) {
      setConservant(newConservant);
      if (!getConversation(conversations, newConservant._id)) {
        const newConversation = {
          _id: newConservant._id,
          recipient: newConservant,
          new: true,
          messages: [],
        };
        conversations = [newConversation, ...conversations];
      }
    }
    setConversations(conversations);
    setLoading(false);
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <>
      <div className='fixed bottom-0 right-[48px] w-[335px] shadow-md  bg-main-purple rounded-t-lg hover:cursor-pointer'>
        <div
          onClick={() => setOpenListUser(!isOpenListUser)}
          className={`flex items-center justify-center h-10 border border-dashed  rounded-t-lg border-main-light border-b-0 
          `}
        >
          <WechatFilled className='text-xl text-main-light' />
          <Typography className='text-white text-lg font-bold ml-2'>Chat</Typography>
        </div>
        {isOpenListUser && (
          <div className='border-main-light py-0.5 overflow-y-scroll scrollbar scroll-smooth w-[335px] h-[400px] [&_.hideHead]:hidden border-dashed border border-b-0 bg-main-purple text-white'>
            <UserMessengerEntries
              conservant={conservant}
              conversations={conversations}
              setConservant={setConservant}
              loading={loading}
            />
          </div>
        )}
      </div>
      {isOpenConversation ? (
        <div className='fixed bottom-0 border-main-light border border-b-0 border-dashed right-[400px] w-[500px] h-[480px] shadow-md  bg-main-purple rounded-t-lg'>
          <Space
            className='absolute right-4 top-4'
            onClick={() => {
              setOpenConversation(false);
              setCurrent('');
            }}
          >
            <CloseOutlined className='text-white text-sm cursor-pointer hover:opacity-70' />
          </Space>
          <Messages
            conservant={conservant}
            conversations={conversations}
            setConservant={setConservant}
            setConversations={setConversations}
            getConversation={getConversation}
            isBoxchat={true}
          />
        </div>
      ) : null}
    </>
  );
}
