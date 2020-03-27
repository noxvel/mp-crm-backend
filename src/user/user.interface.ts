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

export interface UserData {
  name: string;
  email: string;
  image?: string;
}

export interface UserRO {
  user: UserData;
  token: string
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