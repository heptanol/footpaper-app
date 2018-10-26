import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {catchError, tap} from 'rxjs/operators';
import {CompetitionConfig, CompetitionResponse} from '../competition.model';
import {Cups} from '../../shared/nav-menu/menu.model';
import {CompetitionService} from '../competition.service';

@Component({
  selector: 'app-cups',
  templateUrl: './cups.component.html',
  styleUrls: ['./cups.component.scss']
})
export class CupsComponent implements OnInit, OnDestroy {

  competition: CompetitionResponse;
  cometitionConfig: CompetitionConfig;
  matchDay: number;
  subscribtions: Subscription[] = [];
  cups = Cups;
  loading = false;
  error = false;
  constructor(
    private competitionService: CompetitionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscribtions.push(this.route.params.subscribe(param => {
      this.cometitionConfig = Object.values(this.cups).find((val) => val.path === param.cupPath);
      this.competitionService.setCompetitionConfig(this.cometitionConfig);
      this.getCompetition(this.cometitionConfig.id);
    }));
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
      .subscribe(competition => {
        this.competition = competition;
        this.competitionService.setCompetition(competition);
      }));
  }

  ngOnDestroy() {
    this.subscribtions.forEach(sub => sub.unsubscribe());
  }
}
