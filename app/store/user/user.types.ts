type User = {
  id: number;
  uuid: string;
  created_at: string;
  token: string;
  freeRequest: number;
};

type UserReqData = {
  key: string;
  uuid: string;
};

type UserState = {
  user: Partial<User>;
  loading: boolean;
};

export type {User, UserState, UserReqData};
