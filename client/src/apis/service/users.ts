import _ from 'lodash';
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

const getUser = async (params: { id: string }) => {
  try {
    const res = await fetch(BASE_URL + 'api/users/' + params.id);
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

const followUser = async (followingId: string, user: { token: any }) => {
  try {
    const res = await fetch(BASE_URL + 'api/users/follow/' + followingId, {
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

const unFollow = async (followingId: string, user: { token: any }) => {
  try {
    const res = await fetch(BASE_URL + 'api/users/unfollow/' + followingId, {
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

export { signup, login, getUser, getRandomUsers, updateUser, unFollow, followUser };
