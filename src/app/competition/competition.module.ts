import { NgModule } from '@angular/core';
import {CompetitionService} from './competition.service';
import {LeaguesComponent} from './leagues/leagues.component';
import {ResultComponent} from './leagues/result/result.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatGridListModule, MatIconModule, MatTabsModule, MatToolbarModule} from '@angular/material';
import {FixtureComponent} from './fixture/fixture.component';
import {FixtureMinComponent} from './fixture/fixture-min/fixture-min.component';
import {TableTeamComponent} from './table-team/table-team.component';
import {MinTableTeamComponent} from './table-team/min-table-team/min-table-team.component';
import {TableComponent} from './leagues/table/table.component';
import {ScorersComponent} from './leagues/scorers/scorers.component';
import {EventIconComponent} from './fixture/event-icon/event-icon.component';
import {FixtureDetailsComponent} from './fixture/fixture-details/fixture-details.component';
import {MinTableComponent} from './min-table/min-table.component';
import {CupsComponent} from './cups/cups.component';
import {TableClComponent} from './cups/table/table.component';
import {ResultClComponent} from './cups/result/result.component';
import {TodayComponent} from './today/today.component';

@NgModule({
  declarations: [
    LeaguesComponent,
    ResultComponent,
    FixtureComponent,
    FixtureMinComponent,
    TableTeamComponent,
    MinTableTeamComponent,
    TableComponent,
    ScorersComponent,
    EventIconComponent,
    MinTableComponent,
    FixtureDetailsComponent,
    CupsComponent,
    TableClComponent,
    ResultClComponent,
    TodayComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatTabsModule
  ],
  exports: [
    TodayComponent
  ],
  providers: [
    CompetitionService
  ],
})
export class CompetitionModule { }
