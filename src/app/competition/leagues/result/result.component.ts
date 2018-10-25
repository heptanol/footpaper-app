import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {catchError, tap} from 'rxjs/operators';
import {Devices} from '../../../shared/responsive/responsive.model';
import {CompetitionService} from '../../competition.service';
import {ResponsiveService} from '../../../shared/responsive/responsive.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, OnDestroy {
  @Input()competition: any;
  matchDay: number;
  totalMatchDay: number;
  fixtures: any[];
  subscribtion: Subscription;
  loading = false;
  error = false;
  device: Devices;
  deviceList = Devices;
  constructor(
    private competitionService: CompetitionService,
    private responsiveService: ResponsiveService,
  ) {}

  ngOnInit() {
    this.competition = this.competitionService.getCompetition();
    this.device = this.responsiveService.detectDevice();
    this.getData(this.competition.competition.id, this.competition.season.currentMatchday);
  }

  getData(competitionId, matchday?: number) {
    matchday = !matchday ? 1 : matchday;
    this.matchDay = matchday;
    this.loading = true;
    this.subscribtion = this.competitionService.getMatches(competitionId, matchday, null)
      .pipe(
        tap(() => this.loading = false),
        catchError(err => {
          this.loading = false;
          this.error = true;
          return err;
        })
      )
      .subscribe((data: any) => {
        this.fixtures = data.matches;
        this.totalMatchDay = data.totalMatchDays;
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.device = this.responsiveService.detectDevice();
  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }


}
