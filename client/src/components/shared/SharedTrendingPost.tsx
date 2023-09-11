import { StarFilled } from '@ant-design/icons';
import { Col, Divider, message, Row, Space, Spin, Typography } from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { deletePost, getPosts } from '../../apis/service/posts';
import { isLoggedIn } from '../../helper/authhelper';
import useBackdropStore from '../../state/useBackdropStore';
import useTrendingPostStore from '../../state/useTrendingPostStore';
import PrimaryCard from '../custom/card/PrimaryCard';
import PrimaryEmpty from '../custom/empty/PrimaryEmpty';
import SharedPostCard from './SharedPostCard';

export default function SharedTrendingPost() {
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<any>(null);
  const user = isLoggedIn();
  const { setOpenBackdrop } = useBackdropStore();
  const { isEdit } = useTrendingPostStore();

  const fetchPosts = async () => {
    const query = { sortBy: '-likeCount' };
    const data = await getPosts(user && user.token, query);
    const topPosts = [];
    if (data && data.data) {
      for (let i = 0; i < 5 && i < data.data.length; i++) {
        topPosts.push(data.data[i]);
      }
    }
    setPosts(topPosts);
    setLoading(false);
  };

  const handleDelecard = async (_id: string) => {
    setOpenBackdrop(true);
    const data = await deletePost(_id, isLoggedIn());
    message.success('Post deleted successful');
    fetchPosts();
    setOpenBackdrop(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  useEffect(() => {
    if (isEdit) {
      fetchPosts();
    }
  }, [isEdit]);
  return (
    <PrimaryCard className='bg-main-purple  border-white  p-4 pt-2 '>
      <Space>
        <Typography className='text-lg flex items-center gap-2 font-medium text-white'>
          {/* <Space className='bg-white w-6 h-6 rounded-full flex items-center justify-center'> */}
          <StarFilled className='text-white text-lg' />
          {/* </Space> */}
          <span>TOP TRENDING POSTS</span>
        </Typography>
      </Space>
      <Divider className='my-2 bg-white' />
      <Row gutter={[12, 16]} className='mt-4'>
        {!loading ? (
          _.size(posts) > 0 ? (
            _.map(posts, (post, index) => {
              return (
                <Col span={24} key={index}>
                  <SharedPostCard fetchPost={fetchPosts} onDeleteCard={handleDelecard} post={post} postId={post._id} />
                </Col>
              );
            })
          ) : (
            <>
              <PrimaryEmpty />
            </>
          )
        ) : (
          <Col span={24}>
            <div className='mt-2 flex justify-center w-full h-40 items-center'>
              <Spin className='[&_.ant-spin-dot-item]:bg-white' size='default' spinning={loading} />
            </div>
          </Col>
        )}
      </Row>
    </PrimaryCard>
  );
}
