import axios from 'axios';

import {store} from '../store';

export const baseURL = 'https://jellyfish-app-b9mgf.ondigitalocean.app';
export const tokenAPI =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInRva2VuSWQiOiIzNGJhZWVmNy1lYmE3LTQzNWEtYWRjNy0wOGFlOGZiMmM4MjIiLCJpYXQiOjE2ODUxMDYwNDR9.ld0_y6TGQQ14yRhcAxJx42Ov5Pn8BeVtI-W4UxWsOb4';

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
    const authHeader = {
      Authorization: tokenAPI ? `Bearer ${tokenAPI}` : '',
    };

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
