import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import { useState } from 'react';

interface userConversationEntryProps {
  conservant: any;
  conversation: any;
  setConservant: any;
}

type MenuItem = Required<MenuProps>['items'][number];

export default function UserConversationEntry(props: userConversationEntryProps) {
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
  const [openKeys, setOpenKeys] = useState(['sub1']);

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && 'sub1'.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const handleClick = () => {
    props.setConservant(recipient);
  };
  const items: MenuItem[] = [
    getItem('Navigation One', 'sub1', <MailOutlined />, [
      getItem('Option 1', '1'),
      getItem('Option 2', '2'),
      getItem('Option 3', '3'),
      getItem('Option 4', '4'),
    ]),
  ];
  return <Menu mode='inline' openKeys={openKeys} onOpenChange={onOpenChange} style={{ width: 256 }} items={items} />;
}
