import { LinkOutlined } from '@ant-design/icons';
import { Button, Divider, message, Space, Typography } from 'antd';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LineIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import PrimaryButton from '../custom/button/PrimaryButton';
import PrimaryModal from '../custom/modal/PrimaryModal';
import ClipboardJS from 'clipboard';
import { useRef } from 'react';

interface SharedSharePostModalProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  url: string;
}

export default function SharedSharePostModal(props: SharedSharePostModalProps) {
  const { isOpen, setOpen, url } = props ?? {};
  const clipboardButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleCopyClick = () => {
    if (url && clipboardButtonRef.current) {
      const clipboard = new ClipboardJS(clipboardButtonRef.current, {
        text: () => url,
      });

      clipboard.on('success', () => {
        message.success('Link copied to clipboard');
        clipboard.destroy();
      });

      clipboard.on('error', () => {
        message.error('Failed to copy link');
        clipboard.destroy();
      });

      clipboardButtonRef.current.click();
    }
  };

  return (
    <PrimaryModal
      open={isOpen}
      footer={null}
      onCancel={() => {
        setOpen(false);
      }}
      centered
      destroyOnClose
      title='Share to'
    >
      <Typography className='mb-4 text-main-purple'>
        <LinkOutlined /> {url}
        <Button ref={clipboardButtonRef} style={{ display: 'none' }}>
          Copy to Clipboard
        </Button>
      </Typography>
      <Space className='mb-2'>
        <FacebookShareButton url={url}>
          <FacebookIcon round={true} size={32} />
        </FacebookShareButton>

        <TwitterShareButton url={url}>
          <TwitterIcon round={true} size={32} />
        </TwitterShareButton>

        <EmailShareButton url={url}>
          <EmailIcon round={true} size={32} />
        </EmailShareButton>

        <TelegramShareButton url={url}>
          <TelegramIcon round={true} size={32} />
        </TelegramShareButton>

        <WhatsappShareButton url={url}>
          <WhatsappIcon round={true} size={32} />
        </WhatsappShareButton>

        <RedditShareButton url={url}>
          <RedditIcon round={true} size={32} />
        </RedditShareButton>

        <LinkedinShareButton url={url}>
          <LineIcon round={true} size={32} />
        </LinkedinShareButton>
        <PrimaryButton
          onClick={handleCopyClick}
          className='h-8 w-8 mb-1.5 border-none bg-gray-500 hover:text-main-light '
          shape='circle'
          icon={<LinkOutlined className='text-main-light' />}
        ></PrimaryButton>
      </Space>
    </PrimaryModal>
  );
}
