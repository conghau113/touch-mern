import axios from 'axios';
import _ from 'lodash';
import useUserStore from '../../state/useUserStore';
import { imageUpload } from '../../utils/imageUpload';

const BASE_URL = 'http://localhost:4000/';

const signup = async (user: any) => {
  try {
    const res = await fetch(BASE_URL + 'api/users/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const login = async (user: any) => {
  try {
    const res = await fetch(BASE_URL + 'api/users/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const changePassword = async (user: { token: any }, data: any) => {
  try {
    const res = await fetch(BASE_URL + 'api/users/changePassword', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: user.token,
        'x-access-token': user.token,
      },
      body: JSON.stringify({ ...data }),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const forgotPassword = async (data: any) => {
  try {
    const res = await fetch(BASE_URL + 'api/users/forgotPassword', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (params: { id: string }) => {
  try {
    const res = await fetch(BASE_URL + 'api/users/' + params.id);
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const getAllUser = async () => {
  try {
    const res = await fetch(BASE_URL + 'api/users/getAllUser');
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const getRandomUsers = async (query: any) => {
  try {
    const res = await fetch(BASE_URL + 'api/users/random?' + new URLSearchParams(query));
    return res.json();
  } catch (err) {
    console.log(err);
  }
};
const updateUser = async (user: any, data: any) => {
  let media: { public_id: any; url: any }[] = [];
  try {
    if (!!_.size(data?.avatar)) {
      media = await imageUpload(data?.avatar);
    }
    const res = await fetch(BASE_URL + 'api/users/' + user.userId, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token,
      },
      body: JSON.stringify({ ...data, avatar: media }),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const followUser = async (followingId: string, user: any) => {
  try {
    const res = await fetch(BASE_URL + `api/users/${followingId}/follow`, {
      method: 'PATCH',
      headers: {
        'x-access-token': user.token,
      },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const unFollow = async (followingId: string, user: any) => {
  try {
    const res = await fetch(BASE_URL + `api/users/${followingId}/unfollow`, {
      method: 'PATCH',
      headers: {
        'x-access-token': user.token,
      },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const patchDataAPI = async (url: string, post: any, token: any) => {
  const res = await axios.patch(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export {
  signup,
  login,
  changePassword,
  getAllUser,
  forgotPassword,
  getUser,
  getRandomUsers,
  updateUser,
  unFollow,
  followUser,
};
