import { Menu, MenuProps, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import _ from 'lodash';
import SharedAvatarAuthUser from '../../../components/shared/SharedAvatar';
import relativeTime from 'dayjs/plugin/relativeTime';
import useChatBoxStore from '../../chatBox/store/useChatBoxStore';

interface userConversationEntryProps {
  conservant: any;
  conversation: any;
  setConservant: any;
  current: string;
  setCurrent: (value: string) => void;
}

type MenuItem = Required<MenuProps>['items'][number];

export default function UserConversationEntry(props: userConversationEntryProps) {
  const { setOpenConversation } = useChatBoxStore();
  dayjs.extend(relativeTime);
  const { current, setCurrent } = props ?? {};
  const recipient = props.conversation?.recipient;
  const username = recipient?.username;
  const selected = props.conservant && props.conservant?.username === recipient?.username;
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const handleClick: MenuProps['onClick'] = (e) => {
    console.log('eeee', e.key);
    props.setConservant(recipient);
    setCurrent(e.key);
    setOpenConversation(true);
  };
  const items: MenuItem[] = [
    getItem(
      <Space className='flex justify-between items-end w-full'>
        <div className='flex items-center'>
          <SharedAvatarAuthUser
            className='h-10 w-10 text-white  items-start border-0'
            avatar={!!_.size(recipient?.avatar) ? recipient?.avatar?.[0]?.avatar?.[0]?.url : undefined}
            userName={recipient?.username}
          />
          <div className='ml-2 cursor-pointer'>
            <Typography className='text-sm flex text-white items-center font-medium'>{recipient.fullName}</Typography>
            <Typography className='text-xs flex text-white items-center font-normal'>#{recipient.username}</Typography>
          </div>
        </div>
        <div>
          <Typography className='text-[11px] text-opacity-80 flex text-white items-center font-thin'>
            {dayjs(props.conversation.lastMessageAt).fromNow()}
          </Typography>
        </div>
      </Space>,
      `${recipient.username}`
    ),
  ];
  return (
    <div>
      <Menu
        mode='inline'
        selectedKeys={[current]}
        className={`bg-transparent text-white [&_.ant-menu-item]:h-16 [&_.ant-menu-item]:px-3 [&_.ant-menu-title-content]:flex
        [&_.ant-menu-item.ant-menu-item-selected]:bg-main-light [&_.ant-menu-item.ant-menu-item-selected]:bg-opacity-40 [&_.ant-menu-item.ant-menu-item-selected]:border-main-light 
        [&_.ant-menu-item.ant-menu-item-selected]:border-none [&_.ant-menu-item]:m-0 [&_.ant-menu-item]:my-[1px] [&_.ant-menu-item]:w-full [&_.ant-menu-item]:rounded-none [&_.ant-menu-item.ant-menu-item-active]:hover:!bg-opacity-40 [&_.ant-menu-item.ant-menu-item-active]:!bg-main-light`}
        items={items}
        onClick={handleClick}
      />
    </div>
  );
}
