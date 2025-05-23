import {
  IAnswer,
  ISwitchValues,
} from 'templates/discordleTemplates/game/IGame';

export interface IResult {
  totalScore: number | undefined;
  answers: IAnswer[];
  switchValues: ISwitchValues | undefined;
}
