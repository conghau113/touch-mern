import _ from 'lodash';
import { Params } from 'react-router-dom';
import { imageUpload } from '../../utils/imageUpload';

const BASE_URL = 'http://localhost:4000/';

const getUserLikedPosts = async (likerId: string, token: any, query: any) => {
  try {
    const res = await fetch(BASE_URL + 'api/posts/liked/' + likerId + '?' + new URLSearchParams(query), {
      headers: {
        'x-access-token': token,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const getPosts = async (token: any, query: any) => {
  try {
    const res = await fetch(BASE_URL + 'api/posts?' + new URLSearchParams(query), {
      headers: {
        'x-access-token': token,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const getPost = async (postId: string | undefined, token: any) => {
  try {
    const res = await fetch(BASE_URL + 'api/posts/' + postId, {
      headers: {
        'x-access-token': token,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const getUserLikes = async (postId: string, anchor: any) => {
  try {
    const res = await fetch(
      BASE_URL +
        'api/posts/like/' +
        postId +
        '/users?' +
        new URLSearchParams({
          anchor,
        })
    );

    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const createPost = async (post: any, user: { token: any }) => {
  let media: { public_id: any; url: any }[] = [];
  try {
    const { image, title, content } = post ?? {};
    if (!!_.size(image?.fileList)) {
      media = await imageUpload(image?.fileList);
    }
    const res = await fetch(BASE_URL + 'api/posts', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token,
      },
      body: JSON.stringify({ content, title, image: media }),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const updatePost = async (postId: string, user: { token: any }, data: any) => {
  let media: { public_id: any; url: any }[] = [];
  try {
    const { image, content, title } = data ?? {};
    if (!!_.size(image?.fileList)) {
      media = await imageUpload(image?.fileList);
    }
    const res = await fetch(BASE_URL + 'api/posts/' + postId, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token,
      },
      body: JSON.stringify({ content, title, image: media }),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const deletePost = async (postId: string, user: { token: any }) => {
  try {
    const res = await fetch(BASE_URL + 'api/posts/' + postId, {
      method: 'DELETE',
      headers: {
        'x-access-token': user.token,
      },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const getComments = async (params: any) => {
  try {
    const { id } = params;
    const res = await fetch(BASE_URL + 'api/comments/post/' + id);
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const getUserComments = async (params: { id: any; query: any }) => {
  try {
    const { id, query } = params;
    const res = await fetch(BASE_URL + 'api/comments/user/' + id + '?' + new URLSearchParams(query));
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const createComment = async (comment: any, params: { id: any }, user: { token: any }) => {
  try {
    const { id } = params;
    const res = await fetch(BASE_URL + 'api/comments/' + id, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token,
      },
      body: JSON.stringify(comment),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const updateComment = async (commentId: string, user: { token: any }, data: any) => {
  try {
    const res = await fetch(BASE_URL + 'api/comments/' + commentId, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const deleteComment = async (commentId: string, user: { token: any }) => {
  try {
    const res = await fetch(BASE_URL + 'api/comments/' + commentId, {
      method: 'DELETE',
      headers: {
        'x-access-token': user.token,
      },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const likePost = async (postId: string, user: { token: any }) => {
  try {
    const res = await fetch(BASE_URL + 'api/posts/like/' + postId, {
      method: 'POST',
      headers: {
        'x-access-token': user.token,
      },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const unlikePost = async (postId: string, user: { token: any }) => {
  try {
    const res = await fetch(BASE_URL + 'api/posts/like/' + postId, {
      method: 'DELETE',
      headers: {
        'x-access-token': user.token,
      },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export {
  getPost,
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getUserComments,
  getUserLikedPosts,
  getComments,
  createComment,
  deleteComment,
  updateComment,
  likePost,
  unlikePost,
  getUserLikes,
};
