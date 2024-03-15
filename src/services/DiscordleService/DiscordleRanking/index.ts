import baseService from '../../api';
import { AxiosResponse } from 'axios';
import { IGetTableResponse, IUserScoreDetail } from '../IDiscordleService';

const http = baseService();
const baseUrl = 'DiscordleScore';

const ApiAuth = {
  GetDiscordleHistory: async function (channelId: string, guildId: string) {
    const response: AxiosResponse<IGetTableResponse> = await http.post(
      `${baseUrl}/GetDiscordleHistory`,
      {
        GuildId: guildId,
        ChannelId: channelId,
      }
    );
    return response.data;
  },
  GetUserScoreDetail: async function (userId: string, channelId: string) {
    const response: AxiosResponse<IUserScoreDetail[]> = await http.post(
      `${baseUrl}/GetUserScoreDetail`,
      {
        UserId: userId,
        ChannelId: channelId,
      }
    );
    return response.data;
  },
};

export default ApiAuth;
