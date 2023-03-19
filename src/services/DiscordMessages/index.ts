import * as I from './IDiscordMessagesService';
import baseService from '../api';
import { AxiosResponse } from 'axios';

const http = baseService();

const ApiAuth = {
  GetDiscordMessages: async function () {
    const response: AxiosResponse<I.IGetDiscordMessagesResponse> =
      await http.get('/getChoosedMessage');

    return response.data;
  },

  GetDiscordHints: async function (id: string) {
    const response: AxiosResponse<I.IGetDiscordHintsResponse> = await http.get(
      '/getHints',
      { params: { id } }
    );

    return response.data;
  },
};

export default ApiAuth;
