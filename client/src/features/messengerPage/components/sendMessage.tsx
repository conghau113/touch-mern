import _ from 'lodash';
import { useState } from 'react';
import PrimaryButton from '../../../components/custom/button/PrimaryButton';
import SentIcon from '../../../components/custom/icon/SentIcon';
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
      <div className='flex gap-2 items-center bg-main-light bg-opacity-20 rounded-lg pr-2'>
        <PrimaryTextArea
          className='bg-main-light rounded-none bg-opacity-20 bg-transparent border border-r-main-purple !text-white placeholder-white'
          autoFocus
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey) {
              event.preventDefault();
              if (!!_.size(content) && content.trim() !== '') {
                handleSendMessage();
              } else {
                setContent('');
              }
            }
          }}
          value={content}
          autoComplete='off'
          autoSize={{ minRows: 2, maxRows: 2 }}
          onChange={(e) => setContent(e.target.value)}
          placeholder='Send a message...'
        />
        <PrimaryButton
          shape='circle'
          size='middle'
          className='text-white  flex items-center justify-center pr-1 pb-2'
          onClick={() => {
            if (!!_.size(content) && content.trim() !== '') {
              handleSendMessage();
            } else {
              setContent('');
            }
          }}
          disabled={content.length === 0}
        >
          <SentIcon className='text-white' />
        </PrimaryButton>
      </div>
    </>
  );
}
