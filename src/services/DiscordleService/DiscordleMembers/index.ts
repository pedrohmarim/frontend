import baseService from '../../api';
import { AxiosResponse } from 'axios';
import { IMember } from '../IDiscordleService';

const http = baseService();
const baseUrl = 'DiscordleMembers';

const ApiAuth = {
  GetChannelMembers: async function (channelId: string, code: string) {
    const response: AxiosResponse<IMember[]> = await http.post(
      `${baseUrl}/GetChannelMembers`,
      {
        ChannelId: channelId,
        Code: code,
      }
    );
    return response.data;
  },
  ValidateToken: async function (token: string, userId: string) {
    const response: AxiosResponse<string> = await http.post(
      `${baseUrl}/ValidateToken`,
      {
        UserId: userId,
        Token: token,
      }
    );
    return response.data;
  },
};

export default ApiAuth;
