import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getConversations } from '../../apis/service/messages';
import { isLoggedIn } from '../../helper/authhelper';
import Navbar from '../navbar';
import Messages from './components/messages';
import UserMessengerEntries from './components/userMessengerEntries';

export default function MessengerPage() {
  const [conservant, setConservant] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = isLoggedIn();
  const { state } = useLocation();
  const newConservant = state && state.user;

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
      <Row>
        <Col span={24}>
          <Navbar />
        </Col>
        <Col span={24}>
          {!conservant ? (
            <>
              <div className='w-full border-r'>
                <UserMessengerEntries
                  conservant={conservant}
                  conversations={conversations}
                  setConservant={setConservant}
                  loading={loading}
                />
                <div>
                  <Messages
                    conservant={conservant}
                    conversations={conversations}
                    setConservant={setConservant}
                    setConversations={setConversations}
                    getConversation={getConversation}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className='h-full'>
                <Messages
                  conservant={conservant}
                  conversations={conversations}
                  setConservant={setConservant}
                  setConversations={setConversations}
                  getConversation={getConversation}
                  // mobile
                />
              </div>
            </>
          )}
        </Col>
      </Row>
    </>
  );
}
