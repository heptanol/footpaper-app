import {StageType, Team} from '../fixture/match.model';

export interface Standing {
  group: string;
  stage: StageType;
  type: StandingType;
  table: TableTeamModel[];
}

export interface TableTeamModel  {
  position: number;
  team: Team;
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

export enum StandingType {
  TOTAL = 'TOTAL',
  HOME = 'HOME',
  AWAY = 'AWAY',
}
