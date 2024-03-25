import baseService from '../../api';
import { AxiosResponse } from 'axios';
import {
  IChangeSwitchGet,
  IChangeSwitchRequest,
  ISwitchValues,
} from 'templates/discordleTemplates/game/components/MessageTabs/components/ConfigurationModal/IConfigurationModal';

const http = baseService();
const baseUrl = 'DiscordleInstance';

const ApiAuth = {
  CreateDiscordleInstance: async function (channelId: string, guildId: string) {
    const response: AxiosResponse = await http.post(
      `${baseUrl}/CreateDiscordleInstance`,
      {
        ChannelId: channelId,
        GuildId: guildId,
      }
    );
    return response.data;
  },
  UpdateSwitchDiscordleInstance: async function (data: IChangeSwitchRequest) {
    const response: AxiosResponse<void> = await http.post(
      `${baseUrl}/UpdateSwitchDiscordleInstance`,
      {
        Checked: data.checked,
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
};

export default ApiAuth;
