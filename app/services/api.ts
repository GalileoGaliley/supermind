import axios from 'axios';

import {store} from '../store';

const baseURL = 'https://jellyfish-app-b9mgf.ondigitalocean.app';

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (request: any) => {
    const {getState} = store;
    const {
      user: {
        user: {token},
      },
    } = getState();

    const authHeader = token ? {Authorization: `Bearer ${token}`} : {};

    return {
      ...request,
      headers: {
        ...request.headers,
        ...authHeader,
      },
    };
  },
  error => {
    return Promise.reject(error);
  },
);

export {axiosInstance};
