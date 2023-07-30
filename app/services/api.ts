import axios from 'axios';

import {store} from '../store';

export const baseURL = 'http://192.168.0.109:3000';
export const tokenAPI =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInRva2VuSWQiOiJkYTkwZTQ2Zi00NDA5LTQyMmQtOWYyMC1kOTc1M2YwNmQwNzIiLCJpYXQiOjE2ODUwNDQ1NzB9.FjE-c5QG3dhG5E8E0favRodJqpOERWNeYZfsHKIVdxE';

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
    console.log(token);
    const authHeader = {
      Authorization: `Bearer ${tokenAPI}`,
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
