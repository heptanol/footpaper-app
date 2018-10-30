import {Component, OnInit} from '@angular/core';
import {catchError, tap} from 'rxjs/operators';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer, makeStateKey, TransferState} from '@angular/platform-browser';
import {DurationType, Match, StageType, StatusType} from '../match.model';
import {CompetitionService} from '../../competition.service';

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
  loading = false;
  error = false;
  StageType = StageType;
  videoUrl: any;
  showVideo = false;

  constructor(
    private competitionService: CompetitionService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private state: TransferState
  ) {}

  ngOnInit() {
    this.subscribtions.push(this.route.params.subscribe(param => {
      this.leagueId = param.leaguePath;
      const matchId =  param.matchId;
      this.getMatche(this.leagueId, matchId);
    }));
  }

  getMatche(competitionId, matchId): void {
    this.fixture = this.state.get(MATCH_KEY, null as any);
    if (!this.fixture) {
      this.subscribtions.push(this.competitionService.getMatche(competitionId, matchId)
        .subscribe(data => {
          this.fixture = <Match>data;
          this.state.set(MATCH_KEY, data as any);
          if (this.fixture.status === StatusType.FINISHED) {
            this.updateVideoUrl(this.generateMatchSearchWord());
          }
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

  // setSocialMediaData() {
  //   const title = this.fixture.homeTeam.name + ' VS ' + this.fixture.awayTeam.name;
  //   const descrb = this.fixture.homeTeam.name + ' VS ' + this.fixture.awayTeam.name
  //   + ', ' + new Date(this.fixture.utcDate).toDateString();
  //   this.headerService.setShareTitle(title);
  //   this.headerService.setShareDescription(descrb);
  // }

  generateMatchSearchWord(): string {
    return this.fixture.homeTeam.name + ' ' +
      this.fixture.score.fullTime.homeTeam + '-' + this.fixture.score.fullTime.awayTeam + ' ' +
      this.fixture.awayTeam.name;
  }

  updateVideoUrl(query: string) {
    // Appending an ID to a YouTube URL is safe.
    // Always make sure to construct SafeValue objects as
    // close as possible to the input data so
    // that it's easier to check if the value is safe.
    const dangerousVideoUrl = 'https://www.youtube.com/embed?listType=search&list=' + query;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(dangerousVideoUrl);
    this.showVideo = true;
  }
}
