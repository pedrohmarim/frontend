import baseService from '../../api';
import { AxiosResponse } from 'axios';
import { ISwitchValues } from 'templates/discordleTemplates/game/IGame';
import { IChangeSwitchGet } from 'templates/discordleTemplates/game/components/ConfigurationModal/IConfigurationModal';
import { IChangeSwitchRequest } from 'templates/discordleTemplates/game/components/ConfigurationModal/components/GameConfig/IGameConfig';

const http = baseService();
const baseUrl = 'DiscordleInstance';

const ApiAuth = {
  CreateDiscordleInstance: async function (
    channelId: string,
    guildId: string,
    code: string,
    showDiscordOnHome: boolean,
    updateCheckBoxValue: boolean
  ) {
    const response: AxiosResponse = await http.post(
      `${baseUrl}/CreateDiscordleInstance`,
      {
        ChannelId: channelId,
        GuildId: guildId,
        Code: code,
        ShowDiscordOnHome: showDiscordOnHome,
        UpdateCheckBoxValue: updateCheckBoxValue,
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
        Code: data.code,
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
  UpdateShowDiscordOnHomeGuild: async function (
    value: boolean,
    guildId: string
  ) {
    const response: AxiosResponse = await http.post(
      `${baseUrl}/UpdateShowDiscordOnHomeGuild`,
      {
        Value: value,
        GuildId: guildId,
      }
    );
    return response.data;
  },
  GetShowDiscordOnHomeGuild: async function (
    guildId: string,
    channelId: string,
    code: string
  ) {
    const response: AxiosResponse<boolean> = await http.post(
      `${baseUrl}/GetShowDiscordOnHomeGuild`,
      {
        GuildId: guildId,
        ChannelId: channelId,
        Code: code,
      }
    );
    return response.data;
  },
  UpdateDiscordleInstanceCode: async function (
    guildId: string,
    channelId: string,
    code: string,
    value: string
  ) {
    const response: AxiosResponse = await http.post(
      `${baseUrl}/UpdateDiscordleInstanceCode`,
      {
        GuildId: guildId,
        ChannelId: channelId,
        Code: code,
        Value: value,
      }
    );
    return response.data;
  },
};

export default ApiAuth;
