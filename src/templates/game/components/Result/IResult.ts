import { IAwnser } from 'templates/game/IGame';

export interface IResult {
  awnsers: IAwnser[];
  timer: string | undefined;
}
