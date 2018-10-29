import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DurationType, Match, StatusType} from '../match.model';

@Component({
  selector: 'app-fixture-min',
  templateUrl: './fixture-min.component.html',
  styleUrls: ['./fixture-min.component.scss']
})
export class FixtureMinComponent implements OnInit{

  @Input() fixture: Match;
  @Input() competition: any;
  statusType = StatusType;
  durationsTypes = DurationType;
  href: string;

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

  ngOnInit(): void {
    this.href = 'match/' + this.competition.id + '/' + this.fixture.id;
  }

}
