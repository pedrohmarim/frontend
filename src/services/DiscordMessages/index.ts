import * as I from './IDiscordMessagesService';
import baseService from '../api';
import { AxiosResponse } from 'axios';

const http = baseService();
const baseURL =
  'https://discord.com/api/v9/channels/790633651888324618/messages';
const authorization =
  'NTkwNTI0NTc5Nzg1NjA1MTIw.GIKTQ8.jQltZga3SGXlGsHfgG-XvE_SANDaUw1aJUl9pA';
const limit = 'limit=100';

const ApiAuth = {
  GetDiscordMessages: async function () {
    const response: AxiosResponse<I.IMessage[]> = await http.get(
      `${baseURL}?${limit}`,
      {
        headers: {
          authorization,
        },
      }
    );
    return response.data;
  },
  GetDiscordPreviousMessages: async function (id: string) {
    const response: AxiosResponse<I.IMessage[]> = await http.get(
      `${baseURL}?before=${id}&${limit}`,
      {
        headers: {
          authorization,
        },
      }
    );
    return response.data;
  },
};

export default ApiAuth;
