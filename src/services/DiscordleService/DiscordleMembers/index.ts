import baseService from '../../api';
import { AxiosResponse } from 'axios';
import { IMember } from '../IDiscordleService';

const http = baseService();
const baseUrl = 'DiscordleMembers';

const ApiAuth = {
  GetChannelMembers: async function (channelId: string) {
    const response: AxiosResponse<IMember[]> = await http.post(
      `${baseUrl}/GetChannelMembers`,
      {
        ChannelId: channelId,
      }
    );
    return response.data;
  },
};

export default ApiAuth;
