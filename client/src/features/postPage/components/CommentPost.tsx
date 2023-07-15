import { BackTop, Empty, message } from 'antd';
import Typography from 'antd/es/typography/Typography';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getComments } from '../../../apis/service/posts';
import PrimaryCard from '../../../components/custom/card/PrimaryCard';
import useBackdropStore from '../../../state/useBackdropStore';
import CommentCard from './CommentCard';
import Commenteditor from './CommentEditor';

interface CommentPostProps {
  fetchPost?: () => void;
  profileUser?: any;
}

export default function CommentPost({ fetchPost, profileUser }: CommentPostProps) {
  const params = useParams();
  const [comments, setComments] = useState<any[]>([]);
  const [commentP, setCommentsP] = useState<any[]>([]);
  const [rerender, setRerender] = useState<boolean>(false);
  const { setOpenBackdrop } = useBackdropStore();

  const fetchComments = async () => {
    setOpenBackdrop(true);

    const data = await getComments(params);
    if (data.error) {
      message.error(data.error ?? 'Fail to fetch comments');
    } else {
      setComments(data);
    }
    setOpenBackdrop(false);
  };

  const findComment = (id: any) => {
    let commentToFind;

    const recurse = (comment: any, id: any) => {
      if (comment._id === id) {
        commentToFind = comment;
      } else {
        for (let i = 0; i < comment.children.length; i++) {
          const commentToSearch = comment.children[i];
          recurse(commentToSearch, id);
        }
      }
    };

    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      recurse(comment, id);
    }

    return commentToFind;
  };
  const addComment = (comment: any) => {
    console.log(comment, 'comment.parent');
    if (comment.parent) {
      const parentComment: any = findComment(comment.parent);
      parentComment.children = [comment, ...parentComment.children];

      // setComments(parentComment)
      const newCommnets = _.map(comments, (comment) => {
        if (comment._id === parentComment._id) {
          return parentComment;
        }
        return comment;
      });
      setRerender(!rerender);
    } else {
      setComments([comment, ...comments]);
    }
  };

  const removeComment = (removedComment: { parent: any; _id: any }) => {
    if (removedComment.parent) {
      const parentComment: any = findComment(removedComment.parent);
      parentComment.children = _.filter(
        parentComment.children,
        (comment: { _id: any }) => comment._id !== removedComment._id
      );
      setRerender(!rerender);
    } else {
      setComments(comments.filter((comment) => comment._id !== removedComment._id));
    }
  };

  const editComment = (editedComment: { parent: any; _id: any }) => {
    if (editedComment.parent) {
      let parentComment: any = findComment(editedComment.parent);
      for (let i = 0; i < parentComment.children.length; i++) {
        if (parentComment.children[i]._id === editedComment._id) {
          parentComment.children[i] = editedComment;
        }
      }
    } else {
      for (let i = 0; i < comments.length; i++) {
        if (comments[i]._id === editedComment._id) {
          comments[i] = editedComment;
        }
      }
      setRerender(!rerender);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [params.id]);

  return (
    <div className='mb-4'>
      <Commenteditor fetchPost={fetchPost} addComment={addComment} />
      <div className='mt-4'>
        {!!_.size(comments) ? (
          _.map(comments, (comment, index) => {
            return (
              <CommentCard
                commentChild={comment?.children}
                addComment={addComment}
                removeComment={removeComment}
                editComment={editComment}
                comment={comment}
                key={comment._id}
                depth={0}
              />
            );
          })
        ) : (
          <PrimaryCard className='bg-main-light'>
            <Empty description='No comment yet...' />
            <Typography className='text-center'>Be the first one to commnet!</Typography>
          </PrimaryCard>
        )}
      </div>
    </div>
  );
}
