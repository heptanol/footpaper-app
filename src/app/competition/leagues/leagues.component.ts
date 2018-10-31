import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {catchError} from 'rxjs/operators';
import {Leagues} from '../../shared/nav-menu/menu.model';
import {CompetitionService} from '../competition.service';
import {HeaderService} from '../../shared/header/header.service';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.scss']
})
export class LeaguesComponent implements OnInit, OnDestroy {

  competition: any;
  subscribtions: Subscription[] = [];
  leagues = Leagues;
  error = false;
  constructor(
    private competitionService: CompetitionService,
    private route: ActivatedRoute,
    private headerService: HeaderService,
  ) { }

  ngOnInit() {
    this.handlePath();
  }

  getCompetition(competitionId): void {
    this.subscribtions.push(this.competitionService.getCompetitionStandings(competitionId)
      .pipe(
        catchError(err => {
          this.error = true;
          return err;
        })
        )
      .subscribe(competition => {
        this.competition = competition;
        this.competitionService.setCompetition(competition);
      }));
  }

  handlePath() {
    this.subscribtions.push(this.route.params.subscribe(param => {
      const comp = Object.values(this.leagues).find((val) => val.path === param.leaguePath);
      this.getCompetition(comp.id);
      if (this.competition) {
        this.headerService.setSubTitle(this.competition.competition.name);
      }
    }));
  }

  ngOnDestroy() {
    this.subscribtions.forEach(sub => sub.unsubscribe());
  }
}
