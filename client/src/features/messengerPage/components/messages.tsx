import { Divider, Typography } from 'antd';
import { Key, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMessages, sendMessage } from '../../../apis/service/messages';
import SharedAvatarAuthUser from '../../../components/shared/SharedAvatar';
import { isLoggedIn } from '../../../helper/authhelper';
import { socket } from '../../../helper/socketHelper';
import Message from './message';
import SendMessage from './sendMessage';

interface MessagesProps {
  conservant: any;
  conversations: any;
  setConservant: any;
  setConversations: any;
  getConversation: any;
}

export default function Messages(props: MessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const user = isLoggedIn();
  const [messages, setMessages] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

    socket.emit('send-message', conversation.recipient._id, user.username, content);
  };

  const handleReceiveMessage = (senderId: any, username: string, content: string) => {
    const newMessage = { direction: 'to', content };

    const conversation = props.getConversation(conversationsRef.current, senderId);

    console.log(username + ' ' + content);

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
    socket.on('receive-message', handleReceiveMessage);
  }, []);

  return props.conservant ? (
    <div className='flex items-center gap-2 h-16 px-2'>
      <SharedAvatarAuthUser avatar={props.conservant.username} />
      <Typography>
        <Link to={'/users/' + props.conservant.username}>
          <b>{props.conservant.username}</b>
        </Link>
      </Typography>
      <Divider />
      <div className='h-[75vh]'>
        <div className='p-2 overflow-y-auto ,ax-h-full flex flex-col-reverse'>
          <div ref={messagesEndRef} />
          {messages.map((message: any, i: Key | null | undefined) => (
            <Message conservant={props.conservant} message={message} key={i} />
          ))}
        </div>
      </div>
      <>
        <SendMessage onSendMessage={handleSendMessage} />
        {scrollToBottom()}
      </>
    </div>
  ) : (
    <div className='h-full flex items-center justify-center'>
      <Typography>PostIt Messenger</Typography>
      <Typography color='secondary'>Privately message other users on PostIt</Typography>
    </div>
  );
}
