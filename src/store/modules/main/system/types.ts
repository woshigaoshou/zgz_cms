export interface ISystemModule {
  usersList: any[];
  usersCount: number;
  roleList: any[];
  roleCount: number;
  goodsList: any[];
  goodsCount: number;
  menuList: any[];
  menuCount: number;
}

export interface IPageListPayload {
  pageName: string;
  queryInfo: any;
}

export interface IPageDataDeletePayLoad {
  pageName: string;
  id: number;
}
