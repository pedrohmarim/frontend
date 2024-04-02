import baseService from '../../api';
import { AxiosResponse } from 'axios';
import { IGetMemberResponse } from '../IDiscordleService';

const http = baseService();
const baseUrl = 'DiscordleMembers';

const ApiAuth = {
  GetChannelMembers: async function (channelId: string, code: string) {
    const response: AxiosResponse<IGetMemberResponse> = await http.post(
      `${baseUrl}/GetChannelMembers`,
      {
        ChannelId: channelId,
        Code: code,
      }
    );
    return response.data;
  },
  ValidateToken: async function (
    token: string,
    userId: string,
    channelId: string
  ) {
    const response: AxiosResponse<string> = await http.post(
      `${baseUrl}/ValidateToken`,
      {
        UserId: userId,
        Token: token,
        ChannelId: channelId,
      }
    );
    return response.data;
  },
};

export default ApiAuth;
