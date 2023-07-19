import {UserReqData} from '../../store/user/user.types';

import {fetchAuth} from './fetchAuth';

class AuthServices {
  fetchAuthService = (data: UserReqData) => fetchAuth(data);
}

const authServices = new AuthServices();

export {authServices};
