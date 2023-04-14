import * as I from './IDiscordMessagesService';
import baseService from '../api';
import { AxiosResponse } from 'axios';
import { IAwnser } from 'templates/game/IGame';

const http = baseService();

const ApiAuth = {
  GetChoosedMessages: async function (channelId: string) {
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
  GetChannelMembers: async function (channelId: string, guildId: string) {
    const response: AxiosResponse<I.IMember[]> = await http.get(
      '/getChannelMembers',
      {
        params: {
          channelId,
          guildId,
        },
      }
    );
    return response.data;
  },
  ValidateToken: async function (token: string, userId: string) {
    const response: AxiosResponse<boolean> = await http.get('/validateToken', {
      params: {
        userId,
        token,
      },
    });
    return response.data;
  },
  VerifyUser: async function (guildId: string, userId: string) {
    const response: AxiosResponse<boolean> = await http.get('/verifyUser', {
      params: {
        guildId,
        userId,
      },
    });
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
  GetTimer: async function (channelId: string, guildId: string) {
    const response: AxiosResponse<string> = await http.get('/getTimer', {
      params: { guildId, channelId },
    });
    return response.data;
  },
  SaveScore: async function (data: I.IScoreInstance) {
    const response: AxiosResponse<boolean> = await http.post(
      '/saveScore',
      data
    );
    return response.data;
  },
  VerifyAlreadyAwnsered: async function (userId: string, channelId: string) {
    const response: AxiosResponse<IAwnser[]> = await http.get(
      '/verifyAlreadyAwnsered',
      {
        params: {
          userId,
          channelId,
        },
      }
    );
    return response.data;
  },
  GetInstanceChannels: async function (guildId: string) {
    const response: AxiosResponse<I.IInstanceChannels[]> = await http.get(
      '/getInstanceChannels',
      {
        params: {
          guildId,
        },
      }
    );
    return response.data;
  },
  GetDiscordleHistory: async function (channelId: string, guildId: string) {
    const response: AxiosResponse<I.IGetTableResponse> = await http.get(
      '/getDiscordleHistory',
      {
        params: {
          guildId,
          channelId,
        },
      }
    );
    return response.data;
  },
  GetUserScoreDetail: async function (userId: string, channelId: string) {
    const response: AxiosResponse<I.IUserScoreDetail[]> = await http.get(
      '/getUserScoreDetail',
      {
        params: {
          userId,
          channelId,
        },
      }
    );
    return response.data;
  },
  CreateDiscordleInstance: async function (channelId: string, guildId: string) {
    const response: AxiosResponse = await http.post(
      '/createDiscordleInstance',
      {
        channelId,
        guildId,
      }
    );
    return response.data;
  },
};

export default ApiAuth;
