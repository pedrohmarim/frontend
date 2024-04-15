import baseService from '../../api';
import { AxiosResponse } from 'axios';
import { IMember, ISessionUser } from '../IDiscordleService';

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
  GetChannelMemberBySearchValue: async function (
    searchValue: string,
    channelId: string,
    code: string
  ) {
    const response: AxiosResponse<IMember[]> = await http.post(
      `${baseUrl}/GetChannelMemberBySearchValue`,
      {
        SearchValue: searchValue,
        Code: code,
        ChannelId: channelId,
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
  GetUserByToken: async function (
    guildId: string,
    channelId: string,
    code: string
  ) {
    const response: AxiosResponse<ISessionUser> = await http.post(
      `${baseUrl}/GetUserByToken`,
      { GuildId: guildId, ChannelId: channelId, Code: code }
    );
    return response.data;
  },
};

export default ApiAuth;
