import baseService from '../../api';
import { AxiosResponse } from 'axios';
import { IRankingTableData, IUserScoreDetail } from '../IDiscordleService';

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
  GetCheckBoxRanking: async function (
    code: string,
    channelId: string,
    guildId: string,
    memberId: string
  ) {
    const response: AxiosResponse<boolean> = await http.post(
      `${baseUrl}/GetCheckBoxRanking`,
      {
        GuildId: guildId,
        Code: code,
        ChannelId: channelId,
        MemberId: memberId,
      }
    );
    return response.data;
  },
  UpdateCheckBoxRanking: async function (
    code: string,
    channelId: string,
    guildId: string,
    memberId: string,
    value: boolean
  ) {
    await http.post(`${baseUrl}/UpdateCheckBoxRanking`, {
      GuildId: guildId,
      Code: code,
      ChannelId: channelId,
      MemberId: memberId,
      Value: value,
    });
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
  ChangeNickname: async function (
    guildId: string,
    channelId: string,
    code: string,
    memberId: string,
    newNickName: string,
    userIdThatChangedNickname: string
  ) {
    await http.post(`${baseUrl}/ChangeNickname`, {
      ChannelId: channelId,
      GuildId: guildId,
      Code: code,
      MemberId: memberId,
      NewNickName: newNickName,
      UserIdThatChangedNickname: userIdThatChangedNickname,
    });
  },
};

export default ApiAuth;
