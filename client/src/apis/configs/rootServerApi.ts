import queryString from 'query-string';
import axios from 'axios';
import _ from 'lodash';

const rootServerAPI = axios.create({
  baseURL: '',
  //   timeout: 5000, // Thời gian chờ tối đa cho mỗi request
  paramsSerializer: (params) => queryString.stringify(params),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
});

rootServerAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log('Response error: ', error);
    const { data } = error.response;
    console.log(data);
    if (error?.code == 'ERR_NETWORK') {
      _.map(['accessToken', 'account', 'tokenExpired', 'leader_fisx', 'hr'], (item) => localStorage.removeItem(item));
      window.location.reload();
      return Promise.reject({
        data: data?.data || null,
        message: 'notifications.error.connectServer',
      });
    }
    if (data?.status) {
      switch (error.response.status) {
        case 400:
          return Promise.reject(data);

        case 404:
          return Promise.reject({
            data: data?.data || null,
            message: 'notifications.error.connectServer',
          });
        case 401:
          //   _.map(['accessToken', 'account', 'tokenExpired', 'leader_fisx', 'hr'], (item) =>
          //     localStorage.removeItem(item)
          //   );
          //   window.location.reload();
          //   return Promise.reject({
          //     data: data?.data || null,
          //     message: 'notifications.error.connectServer',
          //   });
          return Promise.reject(data);

        case 500: {
          return Promise.reject({
            ...data,
            message: 'notifications.error.server',
          });
        }

        default:
          return Promise.reject(error?.response?.data || error);
      }
    }
    return Promise.reject(error?.response?.data || error);
  }
);

export default rootServerAPI;
