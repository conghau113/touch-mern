import { Col, FloatButton, message, Row } from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deletePost, getPost, updatePost } from '../../apis/service/posts';
import Backdrop from '../../components/custom/backdrop/Backdrop';
import SharedFindUsers from '../../components/shared/SharedFindUsers';
import SharedPostCard from '../../components/shared/SharedPostCard';
import SharedPostModal from '../../components/shared/SharedPostModal';
import SharedTrendingPost from '../../components/shared/SharedTrendingPost';
import { EPostModal } from '../../enums/EPostModal';
import { isLoggedIn } from '../../helper/authhelper';
import useBackdropStore from '../../state/useBackdropStore';
import usePostStore from '../../state/usePostStore';
import Navbar from '../navbar';
import CommentPost from './components/CommentPost';

export default function PostPage() {
  const user = isLoggedIn();
  const params = useParams();
  const { setOpenBackdrop } = useBackdropStore();
  const [post, setPost] = useState<any>({});
  const navigate = useNavigate();
  const { isOpenPostModal, setOpenPostModal, setModePostModal, modePostModal, postValues } = usePostStore();

  const fetchPost = async () => {
    const data = await getPost(params.id, user && user.token);
    if (data.error) {
      message.error(data.error);
    } else {
      setPost(data);
    }
  };

  const handelSubmitPostModal = async (values: any) => {
    setOpenBackdrop(true);
    const data = await updatePost(postValues._id, isLoggedIn(), { ...values });
    if (data && data.error) {
      setOpenBackdrop(false);
      message.error(data.error);
    } else {
      message.success('Update post successful!');
      fetchPost();
      setOpenPostModal(false);
      setOpenBackdrop(false);
    }
  };

  const handleDelecard = async (_id: string) => {
    setOpenBackdrop(true);
    await deletePost(_id, isLoggedIn());
    setOpenBackdrop(false);
    message.success('Post deleted succesfull');
    navigate('/');
  };

  useEffect(() => {
    fetchPost();
  }, [params.id]);
  return (
    <>
      <Row>
        <Col span={24}>
          <Navbar />
        </Col>

        <Col span={24} className='px-8'>
          <Row gutter={[24, 0]} className='mt-20 '>
            <Col span={6}>
              <SharedTrendingPost />
            </Col>
            <Col span={12}>
              {_.size(post) ? (
                <>
                  <SharedPostCard post={post} postId={post._id} onDeleteCard={handleDelecard} />
                  <CommentPost fetchPost={fetchPost} />
                </>
              ) : null}
            </Col>
            <Col span={6}>
              <SharedFindUsers />
            </Col>
          </Row>
        </Col>
      </Row>
      <SharedPostModal isOpen={isOpenPostModal} title={'Update post'} onSubmit={handelSubmitPostModal} />
      <Backdrop />
      <FloatButton.BackTop />
    </>
  );
}
