import { deffHttp } from '@/utils/axios';

export interface UseInfoType {
  userid: string;
  email: string;
  firstName: string;
  lastName: string;
  signature: string;
  introduction: string;
  title: string;
  token: string;
  power: 'test' | 'admin';
  tokenExpires: string;
  refreshToken: string;
  refreshExpires: string;
}

export const getUserInfo = (user: string, pwd: string) =>
  deffHttp.post<UseInfoType>(
    {
      url: `${import.meta.env.VITE_APP_API_BASE}/auth/login`,
      data: { email: user, password: pwd },
    },
    { errorMessageMode: 'modal', withToken: false },
  );
