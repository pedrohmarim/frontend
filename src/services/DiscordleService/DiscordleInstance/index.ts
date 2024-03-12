import baseService from '../../api';
import { AxiosResponse } from 'axios';

const http = baseService();
const baseUrl = 'DiscordleInstance';

const ApiAuth = {
  CreateDiscordleInstance: async function (ChannelId: string, GuildId: string) {
    const response: AxiosResponse = await http.post(
      `${baseUrl}/CreateDiscordleInstance`,
      {
        ChannelId,
        GuildId,
      }
    );
    return response.data;
  },
};

export default ApiAuth;
