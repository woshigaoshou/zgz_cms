import request from '../index';
import { IAccount, IDataType, ILoginResult } from './type';

enum LoginAPI {
  AccountLogin = '/login',
  UserInfo = '/users',
  MenusInfo = '/role',
}

export function accountLogin(account: IAccount) {
  return request.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account,
    showLoading: true,
  });
}

export function fetchUserInfo(id: number) {
  return request.get<IDataType>({
    url: `${LoginAPI.UserInfo}/${id}`,
  });
}

export function fetchUserMenus(id: number) {
  return request.get<IDataType>({
    url: `${LoginAPI.MenusInfo}/${id}/menu`,
  });
}
