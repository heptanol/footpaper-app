import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer, makeStateKey, TransferState} from '@angular/platform-browser';
import {DurationType, Match, StageType, StatusType} from '../match.model';
import {CompetitionService} from '../../competition.service';
import {HeaderService} from '../../../shared/header/header.service';
import {ShareButtons} from '@ngx-share/core';

const MATCH_KEY = makeStateKey('match');

@Component({
  selector: 'app-fixture-details',
  templateUrl: './fixture-details.component.html',
  styleUrls: ['./fixture-details.component.scss']
})
export class FixtureDetailsComponent implements OnInit {

  fixture: any;
  statusType = StatusType;
  durationsTypes = DurationType;
  leagueId: string;
  subscribtions: Subscription[] = [];
  StageType = StageType;
  videoUrl: any;
  showVideo = false;

  constructor(
    private competitionService: CompetitionService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private state: TransferState,
    private headerService: HeaderService
  ) {}

  ngOnInit() {
    this.subscribtions.push(this.route.params.subscribe(param => {
      this.leagueId = param.leaguePath;
      const matchId =  param.matchId;
      this.getMatche(this.leagueId, matchId);
      if (this.fixture) {
        this.updateVideoUrl(this.generateMatchSearchWord());
        this.setSocialMediaData();
      }
    }));
  }

  getMatche(competitionId, matchId): void {
    this.fixture = this.state.get(MATCH_KEY, null as any);
    if (!this.fixture) {
      this.subscribtions.push(this.competitionService.getMatche(competitionId, matchId)
        .subscribe(data => {
          this.fixture = <Match>data;
          this.state.set(MATCH_KEY, data as any);
        }));
    }
  }

  isHomeWinner() {
    if (this.fixture.score.fullTime.homeTeam > this.fixture.score.fullTime.awayTeam) {
      return true;
    } else if (this.fixture.score.extraTime.homeTeam > this.fixture.score.extraTime.awayTeam) {
      return true;
    } else if (this.fixture.score.penalties.homeTeam > this.fixture.score.penalties.awayTeam) {
      return true;
    }
  }

  isAwayWinner() {
    if (this.fixture.score.fullTime.homeTeam < this.fixture.score.fullTime.awayTeam) {
      return true;
    } else if (this.fixture.score.extraTime.homeTeam < this.fixture.score.extraTime.awayTeam) {
      return true;
    } else if (this.fixture.score.penalties.homeTeam < this.fixture.score.penalties.awayTeam) {
      return true;
    }
  }

  setSocialMediaData() {
    if (this.fixture) {
      const title = this.generateMatchSearchWord();
      const descrb = this.generateMatchSearchWord() + '  ' + new Date(this.fixture.utcDate).toDateString();
      this.headerService.setSubTitle(title);
      this.headerService.setShareTitle(title);
      this.headerService.setShareDescription(descrb);
    }
  }

  generateMatchSearchWord(): string {
    return this.fixture.homeTeam.name + ' ' +
      this.fixture.score.fullTime.homeTeam + '-' + this.fixture.score.fullTime.awayTeam + ' ' +
      this.fixture.awayTeam.name;
  }

  updateVideoUrl(query: string) {
    if (this.fixture && this.fixture.status === StatusType.FINISHED) {
      const dangerousVideoUrl = 'https://www.youtube.com/embed?listType=search&list=' + query;
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(dangerousVideoUrl);
      this.showVideo = true;
    }
  }
}
