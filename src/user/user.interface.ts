import { UserEntity } from './user.entity'

// export interface UserData {
//   username: string;
//   email: string;
//   token: string;
//   bio: string;
//   image?: string;
// }

// export interface UserRO {
//   user: UserData;
// }

export interface UserRO {
  name: string;
  email: string;
  roles: string[];
  avatar?: string;
}

export interface UsersRO {
  users: UserEntity[];
}

interface ResDataLogin {
  token: string,
}

interface UserDataInfo {
  roles: string[];
  name: string;
  avatar: string;
}

export interface ResDataInfo {
  code: number;
  message: string;
  data: UserDataInfo;
}

export interface UserLogin {
  code: number;
  message: string;
  data: ResDataLogin;
}