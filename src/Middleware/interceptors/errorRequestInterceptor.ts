import { disableLoading } from '../helpers/loading';
import { decrementActiveRequests } from './requestInterceptor';

export const errorRequestInterceptor = (error: unknown) => {
  decrementActiveRequests();

  disableLoading();

  return Promise.reject(error);
};
