
export interface IUserLogin {
    id?: number;
    username: string;
    phone: string;
    email: string;
    passwword: string;
    
}

export interface IPermission {
    id: number;
    permissionKey: string;
    permissionName: string;
  }
  

export interface IAccountInfo {
    user?: IUserLogin;
    accessToken?: string;
    refreshToken?: string;
    isConfirmed?: boolean;
    role?: {
      id: number;
      roleName: string;
      permissions: IPermission[];
    };
}

export interface ILoginUser {
  status: string;
  data: string;
  jwt: string;
  isAdmin;
}

export interface ILoginBody{
  email: string;
  password: string;
}
