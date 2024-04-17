import baseService from '../../api';
import { AxiosResponse } from 'axios';
import {
  IRankingTableData,
  IResetRanking,
  IUserScoreDetail,
} from '../IDiscordleService';

const http = baseService();
const baseUrl = 'DiscordleScore';

const ApiAuth = {
  GetDiscordleHistory: async function (
    code: string,
    channelId: string,
    guildId: string
  ) {
    const response: AxiosResponse<IRankingTableData[]> = await http.post(
      `${baseUrl}/GetDiscordleHistory`,
      {
        GuildId: guildId,
        Code: code,
        ChannelId: channelId,
      }
    );
    return response.data;
  },
  GetUserScoreDetail: async function (
    userId: string,
    channelId: string,
    guildId: string,
    code: string
  ) {
    const response: AxiosResponse<IUserScoreDetail[]> = await http.post(
      `${baseUrl}/GetUserScoreDetail`,
      {
        UserId: userId,
        ChannelId: channelId,
        GuildId: guildId,
        Code: code,
      }
    );
    return response.data;
  },
  ResetRanking: async function (
    guildId: string,
    channelId: string,
    code: string
  ) {
    const response: AxiosResponse<string> = await http.post(
      `${baseUrl}/ResetRanking`,
      {
        ChannelId: channelId,
        GuildId: guildId,
        Code: code,
      }
    );
    return response.data;
  },
};

export default ApiAuth;
