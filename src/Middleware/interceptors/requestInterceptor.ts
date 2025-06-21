import { InternalAxiosRequestConfig } from 'axios';
import { activateLoading } from '../helpers/loading';
import { getDiscordleToken } from 'utils/localStorage';

let activeRequests = 0;

export const requestInterceptor = async (
  requestConfig: InternalAxiosRequestConfig
) => {
  const discordleToken = getDiscordleToken();

  if (discordleToken) {
    requestConfig.headers[
      'Authorization'
    ] = `Bearer discordle ${discordleToken}`;
  }

  activeRequests++;
  activateLoading();

  return requestConfig;
};

export function getActiveRequests() {
  return activeRequests;
}

export function decrementActiveRequests() {
  activeRequests--;
}
