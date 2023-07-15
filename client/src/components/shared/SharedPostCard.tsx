import { EditFilled, EllipsisOutlined, HeartFilled, HeartOutlined, MessageOutlined } from '@ant-design/icons';
import { Badge, Divider, Dropdown, MenuProps, Space, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { likePost, unlikePost } from '../../apis/service/posts';
import { EPostModal } from '../../enums/EPostModal';
import { isLoggedIn } from '../../helper/authhelper';
import usePostStore from '../../state/usePostStore';
import PrimaryButton from '../custom/button/PrimaryButton';
import PrimaryCard from '../custom/card/PrimaryCard';
import SharedAvatarAuthUser from './SharedAvatar';
import SharedAvatarGroup from './SharedAvatarGroup';
import SharedModalLike from './SharedModalLiked';

interface SharedPostCardProps {
  post: any;
  postId: string;
  onDeleteCard?: (_id: string) => void;
}

export default function SharedPostCard(props: SharedPostCardProps) {
  const { post, onDeleteCard, postId } = props ?? {};
  const { poster, content, createdAt, likeCount, userLikePreview, commentCount, title, edited, _id } = post ?? {};
  const { username } = poster;
  const user = isLoggedIn();
  const userAuthName = user && isLoggedIn()?.username;
  const isAuth = _.includes(userAuthName, username);
  const isLiked = _.includes(
    _.find(userLikePreview, (item) => {
      return item.username === userAuthName;
    })?.username,
    userAuthName
  );

  const navigate = useNavigate();

  const [like, setLike] = useState<boolean>(isLiked ?? false);
  const [isOpenModalLike, setOpenModalLike] = useState<boolean>(false);
  const [likeCountClick, setLikeCountClick] = useState<number>(likeCount);
  const { setOpenPostModal, setModePostModal, setPostValues } = usePostStore();

  const handleSetOpenModalLike = (isOpen: boolean) => {
    setOpenModalLike(isOpen);
  };

  const items: MenuProps['items'] = [
    {
      label: 'Edit',
      key: '1',
      onClick: () => {
        setOpenPostModal(true);
        setModePostModal(EPostModal.Update);
        setPostValues({ ...post });
      },
    },
    {
      label: 'Delete',
      key: '2',
      danger: true,
      onClick: () => {
        onDeleteCard?.(_id);
      },
    },
  ];

  const handleLikePost = async () => {
    setLike(!like);
    if (!like) {
      setLikeCountClick(likeCountClick + 1);
      await likePost(postId, user);
    } else {
      setLikeCountClick(likeCountClick - 1);
      await unlikePost(postId, user);
    }
  };

  useEffect(() => {
    setLikeCountClick(likeCount);
    setLike(isLiked);
  }, [post]);

  return (
    <>
      <PrimaryCard className='bg-main-light'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-2'>
            <SharedAvatarAuthUser userName={_.size(username) ? username : userAuthName} />
            <div className='flex gap-2 items-center'>
              <Typography className='text-base flex items-center font-medium'>{username}</Typography>
              <Badge status='default' />
              <Typography className='flex items-center text-xs font-normal text-gray-600'>
                {dayjs(createdAt).format('DD/MM/YYYY HH:mm')}
              </Typography>
              {edited && (
                <>
                  <Tooltip title='Đã chỉnh sữa'>
                    <Typography className='flex items-center text-xs font-normal text-gray-600'>
                      <EditFilled className='text-gray-400' />
                    </Typography>
                  </Tooltip>
                </>
              )}
            </div>
          </div>
          {isAuth && (
            <Dropdown
              menu={{ items }}
              placement='bottomRight'
              className=' items-center justify-center scale-90 hover:opacity-70'
              // trigger={['click']}
            >
              <PrimaryButton
                size='small'
                shape='circle'
                className='flex items-center justify-center border-none bg-main-purple py-1 text-xl font-medium'
              >
                <EllipsisOutlined className='text-main-blue' />
              </PrimaryButton>
            </Dropdown>
          )}
        </div>
        <Space className='flex flex-col items-start mt-2 gap-0'>
          <Typography.Paragraph
            ellipsis={{ rows: 2, expandable: true, symbol: 'Xem thêm' }}
            className='font-medium mb-0 whitespace-pre-line'
          >
            {title}
          </Typography.Paragraph>
          <Typography.Paragraph
            ellipsis={{ rows: 8, expandable: true, symbol: 'xem thêm' }}
            className='text-sm font-normal whitespace-pre-line mb-0'
          >
            {content}
          </Typography.Paragraph>
        </Space>
        <Divider className='my-3' />
        <Space className='flex items-center gap-3 justify-between'>
          <Space>
            <Space onClick={handleLikePost} className='cursor-pointer hover:opacity-70'>
              {like ? (
                <HeartFilled className='text-lg text-main-pink flex items-center' />
              ) : (
                <HeartOutlined className='text-lg text-main-purple flex items-center' />
              )}
              <Typography>{likeCountClick}</Typography>
            </Space>
            <Space className='cursor-pointer hover:opacity-70' onClick={() => navigate(`/posts/${_id}`)}>
              <MessageOutlined className='text-base text-main-purple flex items-center' />
              <Typography>{commentCount}</Typography>
            </Space>
          </Space>
          {_.size(userLikePreview) ? (
            <>
              <div
                onClick={() => setOpenModalLike(true)}
                className='border-2 px-2 py-1 rounded-full flex justify-center items-center border-white cursor-pointer'
              >
                <HeartFilled className='text-main-pink text-lg -rotate-12 mr-1' />
                <SharedAvatarGroup UserLikePreview={userLikePreview} />
              </div>
              <SharedModalLike isOpen={isOpenModalLike} setOpen={handleSetOpenModalLike} postId={_id} />
            </>
          ) : null}
        </Space>
      </PrimaryCard>
    </>
  );
}
