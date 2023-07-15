import { Divider, Space, Typography } from 'antd';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserLikes } from '../../apis/service/posts';
import useBackdropStore from '../../state/useBackdropStore';
import PrimaryButton from '../custom/button/PrimaryButton';
import PrimaryCard from '../custom/card/PrimaryCard';
import PrimaryModal from '../custom/modal/PrimaryModal';
import SharedAvatarAuthUser from './SharedAvatar';

interface SharedModalLike {
  postId: string;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

export default function SharedModalLike({ postId, isOpen, setOpen }: SharedModalLike) {
  const [userLikes, setUserLikes] = useState<any[]>([]);
  const [hasMorePages, setHasMorePages] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const scrollBoxRef = useRef<HTMLDivElement>(null);
  const { setOpenBackdrop } = useBackdropStore();
  const navigate = useNavigate();

  const fetchUserLikes = async () => {
    if (loading || !hasMorePages) return;
    setOpenBackdrop(true);
    setLoading(true);
    let anchor = '';
    if (userLikes && userLikes.length > 0) {
      anchor = userLikes[userLikes.length - 1].id;
    }
    const data = await getUserLikes(postId, anchor);
    setLoading(false);
    setOpenBackdrop(false);
    if (data.success) {
      setUserLikes([...userLikes, ...data.userLikes]);
      setHasMorePages(data.hasMorePages);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchUserLikes();
    }
  }, [isOpen]);

  const handleScroll = () => {
    const scrollBox = scrollBoxRef.current;

    if (scrollBox !== null) {
      if (scrollBox.scrollTop + scrollBox.clientHeight > scrollBox.scrollHeight - 12) {
        fetchUserLikes();
      }
    }
  };

  useEffect(() => {
    if (!scrollBoxRef.current) {
      return;
    }
    const scrollBox = scrollBoxRef.current;
    scrollBox.addEventListener('scroll', handleScroll);

    return () => {
      scrollBox.removeEventListener('scroll', handleScroll);
    };
  }, [userLikes]);

  return (
    <PrimaryModal
      variant='default'
      title='Like by'
      onCancel={() => {
        setOpen(false);
      }}
      open={isOpen}
      destroyOnClose
      footer={null}
      closable
      centered
    >
      <Divider className='my-4' />
      {_.map(userLikes, (item) => {
        const { username } = item ?? {};
        return (
          <PrimaryCard
            bordered={false}
            onClick={() => navigate(`/users/${username}`)}
            variant='no-spacing'
            className='px-2 py-1 hover:shadow-md cursor-pointer border-main-purple mt-2 rounded-xl shadow-sm'
          >
            <div className='w-full flex items-center'>
              <SharedAvatarAuthUser className='h-8 w-8' userName={username} />
              <Typography>{username}</Typography>
              {/* <Space className='flex items-end justify-end'>
                <PrimaryButton variant='primary'>View</PrimaryButton>
              </Space> */}
            </div>
          </PrimaryCard>
        );
      })}
    </PrimaryModal>
  );
}
