import { Col, FloatButton, message, Row, Spin, Typography } from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'react-router-dom';
import { createPost, deletePost, getPosts, getUserLikedPosts, updatePost } from '../../apis/service/posts';
import Backdrop from '../../components/custom/backdrop/Backdrop';
import PrimaryCard from '../../components/custom/card/PrimaryCard';
import SharedFindUsers from '../../components/shared/SharedFindUsers';
import SharedPostCard from '../../components/shared/SharedPostCard';
import SharedPostModal from '../../components/shared/SharedPostModal';
import SharedSortSelectPost from '../../components/shared/SharedSortSelectPost';
import SharedTrendingPost from '../../components/shared/SharedTrendingPost';
import { EContentType } from '../../enums/EContentType';
import { EPostModal } from '../../enums/EPostModal';
import { isLoggedIn } from '../../helper/authhelper';
import useBackdropStore from '../../state/useBackdropStore';
import usePostStore from '../../state/usePostStore';
import useSelectedTypePostStore from '../../state/useSelectedTypePostStore';
import Navbar from '../navbar';
import MyPostWidget from './components/MyPostWidget';

interface HomePageProps {
  contentType?: EContentType;
  profileUser?: any;
  key?: EContentType;
  propfile?: any;
  isCreatePost?: boolean;
}

const HomePage = (props: HomePageProps) => {
  const { propfile, isCreatePost } = props;
  const { isOpenPostModal, setOpenPostModal, modePostModal, postValues } = usePostStore();
  const user = isLoggedIn();
  const username = user && isLoggedIn()?.username;
  const isUserAuth = _.includes(propfile?.user?.username, username);
  const { setOpenBackdrop } = useBackdropStore();

  const [page, setPage] = useState<number>(0);
  const [end, setEnd] = useState<boolean>(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);
  const { ref, inView } = useInView({});
  const [loading, setLoading] = useState(false);

  const [search] = useSearchParams();
  const [effect, setEffect] = useState(false);
  const searchExists = search && search.get('search') && _.size(search.get('search')) > 0;

  const { selectedPostValue } = useSelectedTypePostStore();

  const contentTypeSorts = {
    posts: {
      '-createdAt': 'Latest',
      '-likeCount': 'Likes',
      '-commentCount': 'Comments',
      createdAt: 'Earliest',
    },
    liked: {
      '-createdAt': 'Latest',
      createdAt: 'Earliest',
    },
  };
  const sorts = contentTypeSorts['posts'];

  const fetchPosts = async () => {
    if (page === 0) {
      if (propfile) {
        setOpenBackdrop(false);
      } else {
        setOpenBackdrop(true);
      }
    } else {
      setLoading(true);
      setOpenBackdrop(false);
    }
    const newPage = page + 1;
    setPage(newPage);

    const query: { page: number; sortBy: string; search?: any; author?: string } = {
      page: newPage,
      sortBy: selectedPostValue,
    };
    let data;
    if (!_.includes(props.contentType, EContentType.Liked)) {
      if (props.profileUser) query.author = props.profileUser.username;
      if (searchExists) query.search = search.get('search');
      data = await getPosts(user && user.token, query);
    } else {
      data = await getUserLikedPosts(props.profileUser._id, user && user.token, query);
    }
    if (data?.data.length < 10) {
      setEnd(true);
    }
    setLoading(false);
    setOpenBackdrop(false);
    if (_.size(query.search)) {
      setPosts(data?.data);
      setCount(data.count);
    } else {
      if (!data.error) {
        setPosts([...posts, ...data.data]);
      }
    }
  };

  const handleFetchPostCreate = async () => {
    setOpenBackdrop(true);
    const query = {
      sortBy: selectedPostValue,
    };
    const data = await getPosts(user && user.token, query);
    if (!data.error) {
      setOpenBackdrop(false);
      setPosts([...data.data]);
      setCount(data.count);
    } else {
      setOpenBackdrop(false);
    }
  };

  const handelSubmitPostModal = async (values: any) => {
    setOpenBackdrop(true);
    const data = await (_.includes(EPostModal.Create, modePostModal)
      ? createPost(values, isLoggedIn())
      : updatePost(postValues._id, isLoggedIn(), { ...values }));
    if (data && data.error) {
      setOpenBackdrop(false);
      message.error(data.error);
    } else {
      if (_.includes(EPostModal.Create, modePostModal)) {
        setPosts([{ ...data, poster: { username } }, ...posts]);
        message.success('Create post successful!');
      } else {
        const newPost = _.map(posts, (post) => {
          if (post._id === data._id) {
            return { ...data, poster: { username } };
          }
          return post;
        });
        setPosts(newPost);
        message.success('Update post successful!');
      }
      setOpenPostModal(false);
      setOpenBackdrop(false);
      setEffect(!effect);
    }
  };

  const handleDelecard = async (_id: string) => {
    setOpenBackdrop(true);
    await deletePost(_id, isLoggedIn());
    message.success('Post deleted successful');
    const newPosts = _.filter(posts, (post) => {
      return post._id !== _id;
    });
    setPosts(newPosts);
    setOpenBackdrop(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [effect, inView]);

  useEffect(() => {
    setPosts([]);
    setPage(0);
    setEnd(false);
    setEffect(!effect);
  }, [search, selectedPostValue, propfile]);

  return (
    <>
      <Row>
        {!propfile ? (
          <Col span={24}>
            <Navbar />
          </Col>
        ) : null}
        <Col span={24} className={`${!propfile ? 'mt-16 px-12' : 'px-4'} mb-4`}>
          <Row gutter={[24, 12]} className='pt-4'>
            {!propfile ? (
              <Col span={6}>
                <SharedSortSelectPost sorts={sorts} />
                <div className='mt-4 w-full'>
                  <SharedTrendingPost />
                </div>
              </Col>
            ) : null}
            <Col span={!propfile ? 12 : 24}>
              {!_.includes(props.contentType, EContentType.Liked)
                ? (isCreatePost || isCreatePost === undefined) && (
                    <MyPostWidget username={username} onClick={() => setOpenPostModal(true)} />
                  )
                : null}
              {searchExists && (
                <div className='mt-4'>
                  <Typography className='text-main-light'>Showing results for "{search.get('search')}"</Typography>
                  <Typography className='text-main-light'>{count} results found</Typography>
                </div>
              )}
              <Row gutter={[12, 16]} className='mt-4'>
                {_.map(posts, (post, index) => {
                  return (
                    <Col span={24} key={index}>
                      <SharedPostCard post={post} postId={post._id} onDeleteCard={handleDelecard} />
                    </Col>
                  );
                })}
              </Row>
              {loading && (
                <div className='mt-2 flex justify-center'>
                  <Spin className='[&_.ant-spin-dot-item]:bg-main-light' size='default' spinning={loading} />
                </div>
              )}
              {!loading && _.size(posts) > 0 && <div ref={ref} />}

              {end && <Typography className='text-center mt-2 text-main-light'>All posts have been viewed</Typography>}
            </Col>
            {!propfile ? (
              <Col span={6}>
                <SharedFindUsers />
              </Col>
            ) : null}
          </Row>
        </Col>
      </Row>
      <SharedPostModal
        isOpen={isOpenPostModal}
        title={_.includes(EPostModal.Update, modePostModal) ? 'Update post' : 'Create post'}
        onSubmit={handelSubmitPostModal}
      />
      <Backdrop />
      <FloatButton.BackTop />
    </>
  );
};

export default HomePage;
