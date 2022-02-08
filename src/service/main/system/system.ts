import request from '../../index';
import { IDataType } from '@/service/types';

export function getPageInfo(url: string, queryInfo: any) {
  return request.post<IDataType>({
    url,
    data: queryInfo,
  });
}
