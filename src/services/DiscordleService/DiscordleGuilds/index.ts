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
  GetGuilds: async function (pageSize: number, pageNumber: number) {
    const response: AxiosResponse<I.IGuildsResponse> = await http.post(
      `${baseUrl}/GetGuilds`,
      { Pagesize: pageSize, Pagenumber: pageNumber }
    );
    return response.data;
  },
  SearchGuildsByValue: async function (searchValue: string) {
    const response: AxiosResponse<I.IGuildsDto[]> = await http.post(
      `${baseUrl}/SearchGuildsByValue`,
      { SearchValue: searchValue }
    );
    return response.data;
  },
};

export default ApiAuth;
