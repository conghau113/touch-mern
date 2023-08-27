import { useState } from 'react';
import PrimaryButton from '../../../components/custom/button/PrimaryButton';
import PrimaryTextArea from '../../../components/custom/input/PrimaryTextArea';

interface SendMessageProps {
  onSendMessage: (content: any) => void;
}

export default function SendMessage(props: SendMessageProps) {
  const [content, setContent] = useState<string>('');

  const handleSendMessage = () => {
    props.onSendMessage(content);
    setContent('');
  };
  return (
    <>
      <div>
        <PrimaryTextArea
          onKeyPress={(e) => {
            if (e.key === 'Enter' && content.length > 0) {
              handleSendMessage();
            }
          }}
          value={content}
          autoComplete='off'
          onChange={(e) => setContent(e.target.value)}
          placeholder='Send a message...'
        />
        <PrimaryButton onClick={handleSendMessage} disabled={content.length === 0}>
          Send
        </PrimaryButton>
      </div>
    </>
  );
}
