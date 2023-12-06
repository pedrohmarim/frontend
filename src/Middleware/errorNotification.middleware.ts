import { Notification } from 'antd_components';
import { AxiosError } from 'axios';

export const errorMiddleware = (error: AxiosError) => {
  console.log('??', error);

  Notification.error({
    message: 'Error',
    // description: message,
  });

  return Promise.reject(error);
};
