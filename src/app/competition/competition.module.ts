import { NgModule } from '@angular/core';
import {CompetitionService} from './competition.service';
import {LeaguesComponent} from './leagues/leagues.component';
import {ResultComponent} from './leagues/result/result.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatGridListModule, MatIconModule, MatTabsModule, MatToolbarModule} from '@angular/material';
import {FixtureComponent} from './fixture/fixture.component';
import {FixtureMinComponent} from './fixture/fixture-min/fixture-min.component';


@NgModule({
  declarations: [
    LeaguesComponent,
    ResultComponent,
    FixtureComponent,
    FixtureMinComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
    MatIconModule,
    MatToolbarModule,
    MatGridListModule,
    MatTabsModule
  ],
  exports: [
  ],
  providers: [
    CompetitionService
  ],
})
export class CompetitionModule { }
