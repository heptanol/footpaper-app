import {StageType} from '../../competition/fixture/match.model';
import {CompetitionConfig} from '../../competition/competition.model';

export const Leagues = {
  LIGA : {
    id: '2014',
    name: 'Liga',
    path:  'liga',
    country: 'spain'
  },
  PRIMERLEAGE : {
    id: '2021',
    name: 'Premier League',
    path:  'premier-league',
    country: 'england'
  },
  SERIA : {
    id: '2019',
    name: 'Serie A',
    path:  'serie-a',
    country: 'italy'
  },
  BUNDESLIGA : {
    id: '2002',
    name: 'Bundesliga',
    path:  'bundesliga',
    country: 'germany'
  },
  LIGUE1 : {
    id: '2015',
    name: 'Ligue 1',
    path:  'ligue-1',
    country: 'france'
  },
  EREDIVISIE : {
    id: '2003',
    name: 'Eredivisie',
    path:  'eredivisie',
    country: 'netherlands'
  },
  PRIMERA : {
    id: '2017',
    name: 'Primeira Liga',
    path:  'primeira-liga',
    country: 'portugal'
  },
};

export const Cups = {
  UEFA_CHAMPIONS_LEAGUE: <CompetitionConfig>{
    path: 'champions-league',
    id: '2001',
    name: 'UEFA champions league',
    country: 'europe',
    availableStage: [
      StageType.ROUND_OF_16,
      StageType.QUARTER_FINALS,
      StageType.SEMI_FINALS,
      StageType.FINAL
    ]
  },
  // WORLD_CUP: <CompetitionConfig>{
  //   path: 'world-cup',
  //   id: 'WC',
  //   name: 'FIFA World Cup',
  //   country: 'world',
  //   availableStage: [
  //     StageType.ROUND_OF_16,
  //     StageType.QUARTER_FINALS,
  //     StageType.SEMI_FINALS,
  //     StageType.FINAL
  //   ]
  // }
};
