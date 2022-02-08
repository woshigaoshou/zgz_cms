import { ILoginState } from './modules/login/types';

export interface IRootState {
  name: string;
}

export interface IRootWithModule {
  login: ILoginState
}

export type IStoreType = IRootState & IRootWithModule
