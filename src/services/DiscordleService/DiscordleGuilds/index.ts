import * as I from '../IDiscordleService';
import baseService from '../../api';
import { AxiosResponse } from 'axios';

const http = baseService();
const baseUrl = 'DiscordleGuilds';

const ApiAuth = {
  GetGuildChannels: async function (
    guildId: string,
    getChannelsWithoutDiscordleInstance: boolean
  ) {
    const response: AxiosResponse<I.IInstanceChannels[]> = await http.post(
      `${baseUrl}/GetGuildChannels`,
      {
        guildId,
        getChannelsWithoutDiscordleInstance,
      }
    );
    return response.data;
  },
  GetGuildsPaginated: async function (pageSize: number, pageNumber: number) {
    const response: AxiosResponse<I.IGuildsResponse> = await http.post(
      `${baseUrl}/GetGuilds`,
      { Pagesize: pageSize, Pagenumber: pageNumber }
    );
    return response.data;
  },
  GetAllGuilds: async function () {
    const response: AxiosResponse<I.IGuildsResponse> = await http.post(
      `${baseUrl}/GetAllGuilds`
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
