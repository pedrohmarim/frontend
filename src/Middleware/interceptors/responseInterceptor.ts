import { disableLoading } from '../helpers/loading';
import { AxiosResponse } from 'axios';
import {
  decrementActiveRequests,
  getActiveRequests,
} from './requestInterceptor';

export const responseInterceptor = (response: AxiosResponse) => {
  decrementActiveRequests();

  if (getActiveRequests() === 0) disableLoading();

  return response;
};
