/************************
 *      API Object      *
 ************************/
import {Standing} from './table-team/table-team.model';
import {Match, Player, Team} from './fixture/match.model';

export interface CompetitionResponse {
  competition: Competition;
  season: Season;
  standings: Standing[];
}
export interface MatchResponse {
  competition: Competition;
  matches: Match[];
  totalMatchDays: number;
}
/************************
 * Competition Object   *
 ************************/
export interface Competition {
  id: number;
  name: string;
  plan: string;
  code: string;
  area: {
    id: number;
    name: string;
  };
}

export interface Season {
  id: number;
  currentMatchday: number;
  startDate: string;
  endDate: string;
}

export interface ScorerTable {
  player: Player;
  team: Team;
  numberOfGoals: number;
}


export interface CompetitionConfig {
  path: string;
  id: string;
  name: string;
  country: string;
  availableStage?: any[];
}
