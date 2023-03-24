import * as I from './IDiscordMessagesService';
import baseService from '../api';
import { AxiosResponse } from 'axios';

const http = baseService();

const ApiAuth = {
  GetDiscordMessages: async function (channelId: string) {
    const response: AxiosResponse<I.IMessageInstance> = await http.get(
      '/getChoosedMessages',
      {
        params: {
          channelId,
        },
      }
    );

    return response.data;
  },
  GetDiscordHints: async function (id: string, channelId: string) {
    const response: AxiosResponse<I.IGetDiscordHintsResponse> = await http.get(
      '/getHints',
      {
        params: { id, channelId },
      }
    );

    return response.data;
  },
  GetTimer: async function (channelId: string) {
    const response: AxiosResponse<string> = await http.get('/getTimer');
    return response.data;
  },
  SaveScore: async function (data: I.IPostSaveScore) {
    const response: AxiosResponse = await http.post('/saveScore', data);
    return response.data;
  },
  CreateDiscordleInstance: async function (
    data: I.ICreateDiscordleInstancePost
  ) {
    const response: AxiosResponse = await http.post(
      '/createDiscordleInstance',
      data
    );
    return response.data;
  },
};

export default ApiAuth;
