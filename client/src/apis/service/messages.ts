const BASE_URL = 'http://localhost:4000/';

const getConversations = async (user: { token: any }) => {
  try {
    const res = await fetch(BASE_URL + 'api/messages', {
      headers: {
        'x-access-token': user.token,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const getMessages = async (user: { token: any }, conversationId: string) => {
  try {
    const res = await fetch(BASE_URL + 'api/messages/' + conversationId, {
      headers: {
        'x-access-token': user.token,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const sendMessage = async (user: { token: any }, message: any, recipientId: string) => {
  try {
    const res = await fetch(BASE_URL + 'api/messages/' + recipientId, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token,
      },
      body: JSON.stringify(message),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export { getConversations, getMessages, sendMessage };
