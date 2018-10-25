/************************
 *    Match Object      *
 ************************/
export interface Match {
  homeTeam: Team;
  awayTeam: Team;
  score: {
    duration: DurationType;
    fullTime: Goals;
    halfTime: Goals;
    extraTime: Goals;
    penalties: Goals;
    winner: string;
  };
  diff: string;
  utcDate: string;
  status: StatusType;
  stage: StageType;
  id: number;
  matchday: number;
}

export interface Team {
  id: number;
  name: string;
  crestUrl?: string;
}

export interface Goals {
  homeTeam: number;
  awayTeam: number;
}

export interface Player {
  countryOfBirth: string;
  dateOfBirth: string;
  firstName: string;
  id: string;
  lastName: string;
  lastUpdated: string;
  name: string;
  nationality: string;
  position: string;
  shirtNumber: number;
}

export enum DurationType {
  EXTRA_TIME = 'EXTRA_TIME',
  PENALTY_SHOOTOUT = 'PENALTY_SHOOTOUT',
  REGULAR = 'REGULAR'
}

export enum StatusType {
  SCHEDULED = 'SCHEDULED',
  LIVE = 'LIVE',
  IN_PLAY = 'IN_PLAY',
  PAUSED = 'PAUSED',
  FINISHED = 'FINISHED',
  POSTPONED = 'POSTPONED',
  SUSPENDED = 'SUSPENDED',
  CANCELED = 'CANCELED'
}

/*TODO à déplacer dans competition.model.ts */
export enum StageType {
  REGULAR_SEASON = 'REGULAR_SEASON',
  GROUP_STAGE = 'GROUP_STAGE',
  ROUND_OF_16 = 'ROUND_OF_16',
  QUARTER_FINALS = 'QUARTER_FINALS',
  SEMI_FINALS = 'SEMI_FINALS',
  FINAL = 'FINAL',
}
