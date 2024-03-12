import * as I from '../IDiscordleService';
import baseService from '../../api';
import { AxiosResponse } from 'axios';

const http = baseService();
const baseUrl = 'DiscordleGuilds';

const ApiAuth = {
  GetGuildById: async function (guildId: string) {
    const response: AxiosResponse<I.IInstanceChannels[]> = await http.post(
      `${baseUrl}/GetGuildById`,
      {
        guildId,
      }
    );
    return response.data;
  },
};

export default ApiAuth;
