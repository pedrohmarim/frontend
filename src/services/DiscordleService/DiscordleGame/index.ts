import * as I from '../IDiscordleService';
import baseService from '../../api';
import { AxiosResponse } from 'axios';
import { IAnswer } from 'templates/discordleTemplates/game/IGame';

const http = baseService();
const baseUrl = 'DiscordleGame';

const ApiAuth = {
  GetChoosedMessages: async function (channelId: string, code: string) {
    const response: AxiosResponse<I.IMessageInstance> = await http.post(
      `${baseUrl}/GetChoosedMessages`,
      {
        ChannelId: channelId,
        Code: code,
      }
    );
    return response.data;
  },
  VerifyAlreadyAnswered: async function (channelId: string, code: string) {
    const response: AxiosResponse<IAnswer[]> = await http.post(
      `${baseUrl}/VerifyAlreadyAnswered`,
      {
        ChannelId: channelId,
        Code: code,
      }
    );
    return response.data;
  },
  SaveScore: async function (data: I.IScoreInstance) {
    const response: AxiosResponse<IAnswer[]> = await http.post(
      `${baseUrl}/SaveScore`,
      data
    );
    return response.data;
  },
  GetDiscordHints: async function (data: I.IDiscordHintsRequest) {
    const response: AxiosResponse<I.IGetDiscordHintsResponse> = await http.post(
      `${baseUrl}/GetHints`,
      data
    );
    return response.data;
  },
  VerifyIfIsDiscordleOwner: async function (guildId: string) {
    const response: AxiosResponse<boolean> = await http.post(
      `${baseUrl}/VerifyIfIsDiscordleOwner`,
      { GuildId: guildId }
    );
    return response.data;
  },
  GetGuildInfo: async function (channelId: string, code: string) {
    const response: AxiosResponse<I.IGuildInfo> = await http.post(
      `${baseUrl}/GetGuildInfo`,
      { ChannelId: channelId, Code: code }
    );
    return response.data;
  },
  GetResultDetails: async function (
    guildId: string,
    channelId: string,
    code: string
  ) {
    const response: AxiosResponse<I.IMessage[]> = await http.post(
      `${baseUrl}/GetResultDetails`,
      { ChannelId: channelId, Code: code, GuildId: guildId }
    );
    return response.data;
  },
};

export default ApiAuth;
