// import * as I from './IDiscordleService';
// import baseService from '../api';
// import { AxiosResponse } from 'axios';
// import { IAwnser } from 'templates/discordleTemplates/game/IGame';

// const http = baseService();
// const baseUrl = 'DiscordleGuilds';

// const ApiAuth = {
//   GetChoosedMessages: async function (channelId: string) {
//     const response: AxiosResponse<I.IMessageInstance> = await http.get(
//       `${baseUrl}/getChoosedMessages`,
//       {
//         params: {
//           channelId,
//         },
//       }
//     );
//     return response.data;
//   },
//   VerifyUser: async function (guildId: string, userId: string) {
//     const response: AxiosResponse<boolean> = await http.get(
//       `${baseUrl}/verifyUser`,
//       {
//         params: {
//           guildId,
//           userId,
//         },
//       }
//     );
//     return response.data;
//   },
//   GetDiscordHints: async function (id: string, channelId: string) {
//     const response: AxiosResponse<I.IGetDiscordHintsResponse> = await http.get(
//       `${baseUrl}/getHints`,
//       {
//         params: { id, channelId },
//       }
//     );

//     return response.data;
//   },
//   GetTimer: async function (channelId: string, guildId: string) {
//     const response: AxiosResponse<string> = await http.get(
//       `${baseUrl}/getTimer`,
//       {
//         params: { guildId, channelId },
//       }
//     );
//     return response.data;
//   },
//   SaveScore: async function (data: I.IScoreInstance) {
//     const response: AxiosResponse<boolean> = await http.post(
//       `${baseUrl}/saveScore`,
//       data
//     );
//     return response.data;
//   },
//   VerifyAlreadyAwnsered: async function (userId: string, channelId: string) {
//     const response: AxiosResponse<IAwnser[]> = await http.get(
//       `${baseUrl}/verifyAlreadyAwnsered`,
//       {
//         params: {
//           userId,
//           channelId,
//         },
//       }
//     );
//     return response.data;
//   },
//   GetGuildById: async function (guildId: string) {
//     const response: AxiosResponse<I.IInstanceChannels[]> = await http.post(
//       `${baseUrl}/GetGuildById`,
//       {
//         guildId,
//       }
//     );
//     return response.data;
//   },
//   GetDiscordleHistory: async function (channelId: string, guildId: string) {
//     const response: AxiosResponse<I.IGetTableResponse> = await http.get(
//       `${baseUrl}/getDiscordleHistory`,
//       {
//         params: {
//           guildId,
//           channelId,
//         },
//       }
//     );
//     return response.data;
//   },
//   GetUserScoreDetail: async function (userId: string, channelId: string) {
//     const response: AxiosResponse<I.IUserScoreDetail[]> = await http.get(
//       `${baseUrl}/getUserScoreDetail`,
//       {
//         params: {
//           userId,
//           channelId,
//         },
//       }
//     );
//     return response.data;
//   },
// };

// export default ApiAuth;
