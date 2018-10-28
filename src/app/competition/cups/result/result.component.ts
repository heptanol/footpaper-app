import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {catchError, tap} from 'rxjs/operators';
import {CompetitionConfig, CompetitionResponse, MatchResponse} from '../../competition.model';
import {Devices} from '../../../shared/responsive/responsive.model';
import {StageType} from '../../fixture/match.model';
import {CompetitionService} from '../../competition.service';
import {ResponsiveService} from '../../../shared/responsive/responsive.service';

@Component({
  selector: 'app-result-cl',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultClComponent implements OnInit, OnDestroy {
  @Input()competition: CompetitionResponse;
  @Input()config: CompetitionConfig;
  matchDay: number;
  groupStageFixtures: any[];
  finalStageFixtures: any[];
  subscribtion: Subscription[] = [];
  totalMatchDay: number;
  loading = false;
  error = false;
  device: Devices;
  deviceList = Devices;
  actualStage: {stage: StageType, index: number};
  avilableStage: any[];
  constructor(
    private competitionService: CompetitionService,
    private responsiveService: ResponsiveService,
  ) {}

  ngOnInit() {
    this.competition = this.competitionService.getCompetition();
    this.config = this.competitionService.getCompetitionConfig();
    this.avilableStage = this.config.availableStage;
    this.setActualStage();
    this.device = this.responsiveService.detectDevice();
    this.getGroupStageData(this.competition.competition.id, this.competition.season.currentMatchday);
    this.getFinalStageData(this.competition.competition.id, this.actualStage.stage);
  }

  getGroupStageData(competitionId, matchday) {
    matchday = !matchday ? 1 : matchday;
    this.matchDay = matchday;
    this.loading = true;
    this.subscribtion.push(this.competitionService.getMatches(competitionId, matchday, null)
      .pipe(
        tap(() => this.loading = false),
        catchError(err => {
          this.loading = false;
          this.error = true;
          return err;
        })
      )
      .subscribe((data: MatchResponse) => {
        this.groupStageFixtures = data.matches;
        this.totalMatchDay = data.totalMatchDays;
      }));
  }

  getFinalStageData(competitionId, stage) {
    this.loading = true;
    this.subscribtion.push(this.competitionService.getMatches(competitionId, null, stage)
      .pipe(
        tap(() => this.loading = false),
        catchError(err => {
          this.loading = false;
          this.error = true;
          return err;
        })
      )
      .subscribe(data => {
        this.finalStageFixtures = data.matches;
      }));
  }

  nextStage(): void {
    this.actualStage = {stage: this.avilableStage[this.actualStage.index + 1], index: this.actualStage.index + 1};
    this.getFinalStageData(this.competition.competition.id, this.actualStage.stage);
  }

  previousStage(): void {
    this.actualStage = {stage: this.avilableStage[this.actualStage.index - 1], index: this.actualStage.index - 1};
    this.getFinalStageData(this.competition.competition.id, this.actualStage.stage);
  }

  setActualStage(): void {
    this.actualStage = {stage: this.avilableStage[0], index: 0};
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.device = this.responsiveService.detectDevice();
  }

  ngOnDestroy() {
    this.subscribtion.forEach(sub => sub.unsubscribe());
  }


}
