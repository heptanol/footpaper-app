import {Component, Input, OnInit} from '@angular/core';
import {catchError, tap} from 'rxjs/operators';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';
import {CompetitionService} from '../competition.service';
import {CompetitionResponse} from '../competition.model';
import {Standing, StandingType, TableTeamModel} from '../table-team/table-team.model';

@Component({
  selector: 'app-min-table',
  templateUrl: './min-table.component.html',
  styleUrls: ['./min-table.component.scss']
})
export class MinTableComponent implements OnInit {

  standings: TableTeamModel[];
  subscribtions: Subscription[] = [];
  competitionName: string;
  loading = false;
  error = false;
  @Input()competitionId: string;
  @Input()homeTeamId: string;
  @Input()awayTeamId: string;
  @Input()group: string;
  groupId: string;
  constructor(
    private competitionService: CompetitionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.group) {
      this.groupId = this.group.replace(' ', '_').toUpperCase();
      this.getCompetitionGroup(this.competitionId);
    } else {
      this.getCompetition(this.competitionId);
    }
  }

  getCompetition(competitionId): void {
    this.loading = true;
    this.subscribtions.push(this.competitionService.getCompetitionStandings(competitionId)
      .pipe(
        tap(() => this.loading = false),
        catchError(err => {
          this.loading = false;
          this.error = true;
          return err;
        })
      )
      .subscribe((competition: CompetitionResponse) => {
        this.competitionName = competition.competition.name;
        competition.standings.filter(value => value.type === StandingType.TOTAL)
          .map((val: Standing) => this.standings = val.table);
      }));
  }

  getCompetitionGroup(competitionId): void {
    this.loading = true;
    this.subscribtions.push(this.competitionService.getCompetitionStandings(competitionId)
      .pipe(
        tap(() => this.loading = false),
        catchError(err => {
          this.loading = false;
          this.error = true;
          return err;
        })
      )
      .subscribe((competition: CompetitionResponse) => {
        this.competitionName = competition.competition.name;
        competition.standings.filter(value => value.type === StandingType.TOTAL)
          .filter(value => value.group === this.groupId)
          .map(value => this.standings = value.table);
        }));
  }

  isHighlight(table) {
    return (table.team.id === this.homeTeamId || table.team.id === this.awayTeamId);
  }

}
