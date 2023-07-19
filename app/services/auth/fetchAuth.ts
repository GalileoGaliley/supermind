import {endpoints} from '../../endpoints';
import {axiosInstance as axios} from '../../services/api';
import type {User, UserReqData} from '../../store/user/user.types';

const {
  auth: {auth: authUrl},
} = endpoints;

const fetchAuth = async (reqData: UserReqData): Promise<User> => {
  try {
    const {data: user} = await axios.post(authUrl, reqData);
    return user;
  } catch (error) {
    return Promise.reject(error);
  }
};

export {fetchAuth};
