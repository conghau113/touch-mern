import { EditFilled, EllipsisOutlined, HeartFilled, HeartOutlined, MessageOutlined } from '@ant-design/icons';
import { Divider, Dropdown, Image, MenuProps, Popover, Space, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'react-use';
import { likePost, unlikePost } from '../../apis/service/posts';
import { EPostModal } from '../../enums/EPostModal';
import ProfileContent from '../../features/profilePage/components/ProfileContent';
import { isLoggedIn } from '../../helper/authhelper';
import useModalStore from '../../state/useModalStore';
import usePostStore from '../../state/usePostStore';
import useUserStore from '../../state/useUserStore';
import PrimaryButton from '../custom/button/PrimaryButton';
import PrimaryCard from '../custom/card/PrimaryCard';
import ReplyCommentIcon from '../custom/icon/ReplyCommentIcon';
import SharedAvatarAuthUser from './SharedAvatar';
import SharedAvatarGroup from './SharedAvatarGroup';
import SharedFollowButton from './SharedFollowButton';
import SharedModalLike from './SharedModalLiked';
import SharedSharePostModal from './SharedSharePostModal';
interface SharedPostCardProps {
  post: any;
  postId: string;
  onDeleteCard?: (_id: string) => void;
  fetchPost?: () => void;
}

export default function SharedPostCard(props: SharedPostCardProps) {
  const { post, onDeleteCard, postId, fetchPost } = props ?? {};
  const { poster, image, content, createdAt, likeCount, userLikePreview, commentCount, title, edited, _id } =
    post ?? {};
  const { username } = poster ?? {};
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
  const { openStaticModal } = useModalStore();
  const [like, setLike] = useState<boolean>(isLiked ?? false);
  const [isSharedOpen, setShareOpen] = useState<boolean>(false);
  const [isOpenModalLike, setOpenModalLike] = useState<boolean>(false);
  const [likeCountClick, setLikeCountClick] = useState<number>(likeCount);
  const { setOpenPostModal, setModePostModal, setPostValues } = usePostStore();

  const { user: UserAuth } = useUserStore();

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
        openStaticModal({
          variant: 'error',
          title: 'Confirm deletion of post!',
          footerButtons: [
            'cancel',
            {
              type: 'accept',
              buttonProps: {
                onClick: () => {
                  onDeleteCard?.(_id);
                  fetchPost?.();
                },
              },
            },
          ],
        });
      },
    },
  ];

  useDebounce(
    () => {
      fetchPost?.();
    },
    1000,
    [likeCountClick]
  );

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
      <PrimaryCard className='bg-white shadow-sm border-main-purple'>
        <div className='flex justify-between'>
          <Popover
            destroyTooltipOnHide
            placement='right'
            content={
              <div className='w-[400px]'>
                <ProfileContent isHover={true} onSubmit={() => {}} profile={{ user: post?.poster }} />
              </div>
            }
          >
            <div className='flex items-center gap-2 cursor-pointer' onClick={() => navigate(`/users/${username}`)}>
              {isAuth ? (
                <SharedAvatarAuthUser
                  avatar={!!_.size(UserAuth?.avatar) ? UserAuth?.avatar : undefined}
                  userName={username}
                />
              ) : (
                <SharedAvatarAuthUser
                  avatar={!!_.size(poster?.avatar) ? poster?.avatar?.[0]?.avatar?.[0]?.url : undefined}
                  userName={username}
                />
              )}
              <div className='flex gap-2 items-center'>
                <div>
                  <Typography className='text-base flex items-center font-medium'>#{username}</Typography>
                  <Typography className='flex  items-center text-[11px] font-normal text-gray-600'>
                    {dayjs(createdAt).format('DD/MM/YYYY HH:mm')}
                    {edited && (
                      <>
                        <Tooltip title='Edited' className='ml-1'>
                          <Typography className='flex items-center text-xs font-normal text-gray-600'>
                            <EditFilled className='text-gray-400' />
                          </Typography>
                        </Tooltip>
                      </>
                    )}
                  </Typography>
                </div>
              </div>
            </div>
          </Popover>
          {isAuth ? (
            <Dropdown
              menu={{ items }}
              placement='bottomRight'
              className=' items-center justify-center scale-90 hover:opacity-70'
              trigger={['click']}
            >
              <PrimaryButton
                size='small'
                shape='circle'
                className='flex items-center justify-center border-none bg-main-purple py-1 text-xl font-medium '
              >
                <EllipsisOutlined className='text-main-blue' />
              </PrimaryButton>
            </Dropdown>
          ) : (
            <Space>
              <SharedFollowButton followingUserId={poster?._id} username={poster?.username} />
            </Space>
          )}
        </div>
        <div className='flex flex-col [&_.ant-image]:w-full items-start mt-2 gap-0 w-full'>
          <Typography.Paragraph
            ellipsis={{ rows: 2, expandable: true, symbol: 'More' }}
            className='font-medium mb-0 whitespace-pre-line'
          >
            {title}
          </Typography.Paragraph>
          <Typography.Paragraph
            ellipsis={{ rows: 8, expandable: true, symbol: 'More' }}
            className='text-sm font-normal whitespace-pre-line mb-0'
          >
            {_.map(content.split(/(https?:\/\/[^\s]+)/g), (part, index) => {
              if (part.match(/https?:\/\/[^\s]+/)) {
                return (
                  <a key={index} href={part} target='_blank' rel='noopener noreferrer'>
                    {part}
                  </a>
                );
              } else {
                return part;
              }
            })}
          </Typography.Paragraph>
          {!!_.size(image) && (
            <PrimaryCard variant='no-spacing' className='rounded-lg border-none mt-4'>
              <Image className='w-full rounded-sm' src={`${image?.[0]?.url}`} />
            </PrimaryCard>
          )}
        </div>
        <Divider className='my-3 bg-main-purple' />
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
            <Space onClick={() => setShareOpen(true)} className='cursor-pointer'>
              <ReplyCommentIcon className='text-main-purple' />
            </Space>
          </Space>
          {_.size(userLikePreview) ? (
            <>
              <div
                onClick={() => setOpenModalLike(true)}
                className='border px-2 py-1 rounded-full flex justify-center items-center border-main-purple cursor-pointer'
              >
                <HeartFilled className='text-red-3 text-lg -rotate-12 mr-1' />
                <SharedAvatarGroup UserLikePreview={userLikePreview} />
              </div>
              <SharedModalLike isOpen={isOpenModalLike} setOpen={handleSetOpenModalLike} postId={_id} />
            </>
          ) : null}
        </Space>
      </PrimaryCard>
      {isSharedOpen && (
        <SharedSharePostModal isOpen={isSharedOpen} setOpen={setShareOpen} url={`http://localhost:5173/posts/${_id}`} />
      )}
    </>
  );
}
