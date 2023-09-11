import { ArrowDownOutlined, WechatOutlined } from '@ant-design/icons';
import { Divider, Space, Typography } from 'antd';
import _ from 'lodash';
import { Key, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMessages, sendMessage } from '../../../apis/service/messages';
import PrimaryButton from '../../../components/custom/button/PrimaryButton';
import PrimaryCard from '../../../components/custom/card/PrimaryCard';
import PrimaryEmpty from '../../../components/custom/empty/PrimaryEmpty';
import SharedAvatarAuthUser from '../../../components/shared/SharedAvatar';
import { isLoggedIn } from '../../../helper/authhelper';
import { disconnectSocket, initiateSocketConnection, socket } from '../../../helper/socketHelper';
import useConversationStore from '../../../state/useConversationStore';
import Message from './message';
import SendMessage from './sendMessage';

interface MessagesProps {
  conservant: any;
  conversations: any;
  setConservant: any;
  setConversations: any;
  getConversation: any;
  isBoxchat?: boolean;
}

export default function Messages(props: MessagesProps) {
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const user = isLoggedIn();
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { setCurrent } = useConversationStore();
  const [showFloatbuttonChat, setShowFloatButtonChat] = useState<boolean>(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const conversationsRef = useRef(props.conversations);
  const conservantRef = useRef(props.conservant);
  const messagesRef = useRef(messages);

  useEffect(() => {
    conversationsRef.current = props.conversations;
    conservantRef.current = props.conservant;
    messagesRef.current = messages;
  });

  const conversation =
    props.conversations && props.conservant && props.getConversation(props.conversations, props.conservant._id);

  const setDirection = (messages: any[]) => {
    messages.forEach((message) => {
      if (message.sender._id === user.userId) {
        message.direction = 'from';
      } else {
        message.direction = 'to';
      }
    });
  };

  const fetchMessages = async () => {
    if (conversation) {
      if (conversation.new) {
        setLoading(false);
        setMessages(conversation.messages);
        return;
      }
      setLoading(true);
      const data = await getMessages(user, conversation._id);
      setDirection(data);
      if (data && !data.error) {
        setMessages(data);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [props.conservant]);

  useEffect(() => {
    if (messages) {
      scrollToBottom();
    }
  }, [messages]);
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current?.scrollIntoView();
    }
  };

  const handleSendMessage = async (content: any) => {
    const newMessage = { direction: 'from', content };
    const newMessages = [newMessage, ...messages];

    if (conversation.new) {
      conversation.messages = [...conversation.messages, newMessage];
    }

    let newConversations = props.conversations.filter(
      (conversationCompare: { _id: any }) => conversation._id !== conversationCompare._id
    );

    newConversations.unshift(conversation);
    props.setConversations(newConversations);

    setMessages(newMessages);
    await sendMessage(user, newMessage, conversation.recipient._id);
    await socket.connect().emitWithAck('send-message', conversation.recipient._id, user.username, content);
  };

  const handleReceiveMessage = (senderId: any, username: string, content: string) => {
    const newMessage = { direction: 'to', content };
    const conversation = props.getConversation(conversationsRef.current, senderId);
    if (conversation) {
      let newMessages = [newMessage];
      if (messagesRef.current) {
        newMessages = [...newMessages, ...messagesRef.current];
      }

      setMessages(newMessages);

      if (conversation.new) {
        conversation.messages = newMessages;
      }
      conversation.lastMessageAt = Date.now();

      let newConversations = conversationsRef.current.filter(
        (conversationCompare: { _id: any }) => conversation._id !== conversationCompare._id
      );
      newConversations.unshift(conversation);
      props.setConversations(newConversations);
    } else {
      const newConversation = {
        _id: senderId,
        recipient: { _id: senderId, username },
        new: true,
        messages: [newMessage],
        lastMessageAt: Date.now(),
      };
      props.setConversations([newConversation, ...conversationsRef.current]);
    }
    scrollToBottom();
  };

  useEffect(() => {
    socket.connect().on('receive-message', handleReceiveMessage);
    return () => {
      socket.disconnect();
    };
  }, []);

  return props.conservant ? (
    <div className='h-16 p-2 '>
      <Space className='flex items-center h-12'>
        <Space onClick={() => navigate(`/users/${props.conservant.username}`)}>
          <SharedAvatarAuthUser
            className='h-10 w-10 text-white'
            avatar={!!_.size(props?.conservant?.avatar) ? props?.conservant?.avatar?.[0]?.avatar?.[0]?.url : undefined}
            userName={props?.conservant?.username}
          />
        </Space>
        <div className='ml-2 cursor-pointer' onClick={() => navigate(`/users/${props.conservant.username}`)}>
          <Typography className='text-sm flex text-white items-center font-medium'>
            {props.conservant.fullName}
          </Typography>
          <Typography className='text-xs flex text-white items-center font-normal'>
            #{props.conservant.username}
          </Typography>
        </div>
      </Space>
      <div className={` ${props?.isBoxchat ? 'h-[350px]' : 'h-[65.5vh]'}  mb-1 rounded-lg bg-main-light bg-opacity-20`}>
        <PrimaryCard
          variant='no-style'
          bordered={false}
          onScroll={(e: React.UIEvent<HTMLElement>) => {
            if (messagesContainerRef.current) {
              const offsetHeight = e.currentTarget.scrollTop + e.currentTarget.offsetHeight;
              if (offsetHeight > offsetHeight - offsetHeight / 8) {
                setShowFloatButtonChat(false);
              } else {
                setShowFloatButtonChat(true);
              }
            }
          }}
          ref={messagesContainerRef}
          className='p-2 h-full [&_.ant-card-body]:contents flex flex-col-reverse mt-2 scrollbar overflow-hidden scroll-smooth overflow-y-scroll'
        >
          <div ref={messagesEndRef} />
          {messages.map((message: any, i: Key | null | undefined) => (
            <Message conservant={props.conservant} message={message} key={i} />
          ))}
        </PrimaryCard>
        {/* float button scroll to bottom */}
        {showFloatbuttonChat && (
          <PrimaryButton
            onClick={() => {
              if (messagesContainerRef.current) {
                messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
              }
            }}
            className='absolute bg-white hover:text-main-purple hover:opacity-80 bottom-[70px] left-[48%] z-50 animate-bounce border-none shadow-lg'
            shape='circle'
            size='large'
            icon={<ArrowDownOutlined className='opacity-60' />}
          ></PrimaryButton>
        )}
      </div>
      <div className='mt-2 '>
        <SendMessage onSendMessage={handleSendMessage} />
      </div>
    </div>
  ) : (
    <div className='h-full flex items-center justify-center flex-col'>
      <PrimaryEmpty
        image={
          <div>
            <WechatOutlined className='text-8xl' />
          </div>
        }
        description={
          <>
            <Typography className='text-white mb-2 font-inter'>Messenger</Typography>
            <Typography className='text-white font-inter font-light'>
              Privately message other users on TOUCH!
            </Typography>
          </>
        }
      />
    </div>
  );
}
