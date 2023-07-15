const BASE_URL = 'http://localhost:3001/' || 'https://touch-mern.vercel.app/';

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

const updateUser = async (user: { _id: string; token: any }, data: any) => {
  try {
    const res = await fetch(BASE_URL + 'api/users/' + user._id, {
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

export { signup, login, getUser, getRandomUsers, updateUser };
