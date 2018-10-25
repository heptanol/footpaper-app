import { Routes, RouterModule } from '@angular/router';
import {NewsComponent} from './news/news.component';
import {HomeComponent} from './home/home.component';
import {LeaguesComponent} from './competition/leagues/leagues.component';
import {ResultComponent} from './competition/leagues/result/result.component';

const APP_ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'news', component: NewsComponent},
  {path: 'league/:leaguePath', component: LeaguesComponent, children: [
      {path: 'result', component: ResultComponent},
    ]
  },
  { path: '**', redirectTo: '' }
];

export const Routing = RouterModule.forRoot(APP_ROUTES);
