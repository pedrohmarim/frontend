import baseService from '../../api';
import { AxiosResponse } from 'axios';
import { ISwitchValues } from 'templates/discordleTemplates/game/IGame';
import {
  IChangeSwitchGet,
  IChangeSwitchRequest,
} from 'templates/discordleTemplates/game/components/MessageTabs/components/ConfigurationModal/IConfigurationModal';

const http = baseService();
const baseUrl = 'DiscordleInstance';

const ApiAuth = {
  CreateDiscordleInstance: async function (
    channelId: string,
    guildId: string,
    code: string
  ) {
    const response: AxiosResponse = await http.post(
      `${baseUrl}/CreateDiscordleInstance`,
      {
        ChannelId: channelId,
        GuildId: guildId,
        Code: code,
      }
    );
    return response.data;
  },
  UpdateSwitchDiscordleInstance: async function (data: IChangeSwitchRequest) {
    const response: AxiosResponse<void> = await http.post(
      `${baseUrl}/UpdateSwitchDiscordleInstance`,
      {
        Value: data.value,
        Switch: data.switch,
        GuildId: data.guildId,
        ChannelId: data.channelId,
      }
    );
    return response.data;
  },
  GetSwitchDiscordleInstance: async function (data: IChangeSwitchGet) {
    const response: AxiosResponse<ISwitchValues> = await http.post(
      `${baseUrl}/GetSwitchDiscordleInstance`,
      {
        GuildId: data.guildId,
        ChannelId: data.channelId,
      }
    );
    return response.data;
  },
  ValidateCode: async function (
    code: string,
    guildId: string,
    channelId: string
  ) {
    const response: AxiosResponse<boolean> = await http.post(
      `${baseUrl}/ValidateCode`,
      {
        Code: code,
        GuildId: guildId,
        ChannelId: channelId,
      }
    );
    return response.data;
  },
};

export default ApiAuth;
