import * as I from '../IDiscordleService';
import baseService from '../../api';
import { AxiosResponse } from 'axios';
import { IAwnser } from 'templates/discordleTemplates/game/IGame';

const http = baseService();
const baseUrl = 'DiscordleGame';

const ApiAuth = {
  GetChoosedMessages: async function (channelId: string) {
    const response: AxiosResponse<I.IMessageInstance> = await http.post(
      `${baseUrl}/GetChoosedMessages`,
      {
        ChannelId: channelId,
      }
    );
    return response.data;
  },
  VerifyAlreadyAwnsered: async function (channelId: string) {
    const response: AxiosResponse<IAwnser[]> = await http.post(
      `${baseUrl}/VerifyAlreadyAwnsered`,
      {
        ChannelId: channelId,
      }
    );
    return response.data;
  },
  SaveScore: async function (data: I.IScoreInstance) {
    const response: AxiosResponse<IAwnser[]> = await http.post(
      `${baseUrl}/SaveScore`,
      data
    );
    return response.data;
  },
  GetDiscordHints: async function (data: I.IDiscordHintsRequest) {
    const response: AxiosResponse<I.IGetDiscordHintsResponse> = await http.post(
      `${baseUrl}/GetHints`,
      data
    );
    return response.data;
  },
};

export default ApiAuth;
