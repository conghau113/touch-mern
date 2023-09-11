import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getConversations } from '../../apis/service/messages';
import { isLoggedIn } from '../../helper/authhelper';
import useChatBoxStore from '../chatBox/store/useChatBoxStore';
import Navbar from '../navbar';
import Messages from './components/messages';
import UserMessengerEntries from './components/userMessengerEntries';

export default function MessengerPage() {
  const [conservant, setConservant] = useState(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const user = isLoggedIn();
  const { state } = useLocation();
  const newConservant = state && state.user;
  const { isOpenListUser } = useChatBoxStore();

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
      <Row className=' h-[97.5vh]  '>
        <Col span={24}>
          <Navbar />
        </Col>
        <Col span={24}>
          <Row className='mt-16'>
            <Col span={2}></Col>
            <Col span={20} className='min-h-[84.5vh]'>
              <Row>
                <Col
                  span={24}
                  className='border-main-light  bg-main-purple text-white rounded-md  w-full border-2 flex items-center justify-center  '
                >
                  <Col span={7}>
                    <div className='h-[84.5vh] border-r border-dashed w-full '>
                      <UserMessengerEntries
                        conservant={conservant}
                        conversations={conversations}
                        setConservant={setConservant}
                        loading={loading}
                      />
                    </div>
                  </Col>
                  <Col span={17}>
                    <div className='h-[81.5vh] '>
                      <Messages
                        conservant={conservant}
                        conversations={conversations}
                        setConservant={setConservant}
                        setConversations={setConversations}
                        getConversation={getConversation}
                      />
                    </div>
                  </Col>
                </Col>
              </Row>
              {/* {!_.size(conservant) ? (
                <div className='mt-20 bg-main-purple bg-opacity-20 rounded-md overflow-hidden'>
                  <Row>
                    <div className='w-full border flex items-center justify-center '>
                      <Col span={8}>
                        <div className='h-screen border-r w-full'>
                          <UserMessengerEntries
                            conservant={conservant}
                            conversations={conversations}
                            setConservant={setConservant}
                            loading={loading}
                          />
                        </div>
                      </Col>
                      <Col span={16}>
                        <div className='h-screen'>
                          <Messages
                            conservant={conservant}
                            conversations={conversations}
                            setConservant={setConservant}
                            setConversations={setConversations}
                            getConversation={getConversation}
                          />
                        </div>
                      </Col>
                    </div>
                  </Row>
                </div>
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
              )} */}
            </Col>
            <Col span={2}></Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
