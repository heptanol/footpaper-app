import { Routes, RouterModule } from '@angular/router';
import {NewsComponent} from './news/news.component';
import {HomeComponent} from './home/home.component';
import {LeaguesComponent} from './competition/leagues/leagues.component';
import {ResultComponent} from './competition/leagues/result/result.component';
import {TableComponent} from './competition/leagues/table/table.component';
import {ScorersComponent} from './competition/leagues/scorers/scorers.component';
import {FixtureDetailsComponent} from './competition/fixture/fixture-details/fixture-details.component';

const APP_ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'news', component: NewsComponent},
  {path: 'league/:leaguePath', component: LeaguesComponent, children: [
      {path: 'result', component: ResultComponent},
      {path: 'standing', component: TableComponent},
      {path: 'scorers', component: ScorersComponent}
    ]
  },
  {path: 'match/:leaguePath/:matchId', component: FixtureDetailsComponent},
  { path: '**', redirectTo: '' }
];

export const Routing = RouterModule.forRoot(APP_ROUTES);
