import { Routes, RouterModule } from '@angular/router';
import {NewsComponent} from './news/news.component';
import {HomeComponent} from './home/home.component';

const APP_ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'news', component: NewsComponent},
  { path: '**', redirectTo: '' }
];

export const Routing = RouterModule.forRoot(APP_ROUTES);
