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
  VerifyAlreadyAwnsered: async function (userId: string, channelId: string) {
    const response: AxiosResponse<IAwnser[]> = await http.post(
      `${baseUrl}/VerifyAlreadyAwnsered`,
      {
        UserId: userId,
        ChannelId: channelId,
      }
    );
    return response.data;
  },
  SaveScore: async function (data: I.IScoreInstance) {
    const response: AxiosResponse<boolean> = await http.post(
      `${baseUrl}/SaveScore`,
      data
    );
    return response.data;
  },
  GetTimer: async function (channelId: string, guildId: string) {
    const response: AxiosResponse<string> = await http.post(
      `${baseUrl}/GetTimer`,
      {
        GuildId: guildId,
        ChannelId: channelId,
      }
    );
    return response.data;
  },
};

export default ApiAuth;
