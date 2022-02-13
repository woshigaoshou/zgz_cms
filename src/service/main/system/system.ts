import request from '../../index';
import { IDataType } from '@/service/types';

export function getPageInfo(url: string, queryInfo: any) {
  return request.post<IDataType>({
    url,
    data: queryInfo,
  });
}

export function deletePageData(url: string) {
  return request.delete<IDataType>({
    url,
  });
}

export function createPageData(url: string, newData: any) {
  return request.post<IDataType>({
    url: url,
    data: newData,
  });
}

export function editPageData(url: string, editData: any) {
  return request.patch<IDataType>({
    url: url,
    data: editData,
  });
}
