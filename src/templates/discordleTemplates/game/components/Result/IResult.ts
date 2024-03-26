import { IAnswer } from 'templates/discordleTemplates/game/IGame';

export interface IResult {
  totalScore: number;
  answers: IAnswer[];
}
