import {Component, Input, OnInit} from '@angular/core';
import {catchError, tap} from 'rxjs/operators';
import {CompetitionResponse, ScorerTable} from '../../competition.model';
import {CompetitionService} from '../../competition.service';

@Component({
  selector: 'app-scorers',
  templateUrl: './scorers.component.html',
  styleUrls: ['./scorers.component.scss']
})
export class ScorersComponent implements OnInit {
  @Input()competition: CompetitionResponse;
  scorers: ScorerTable[];
  loading = false;
  error = false;


  constructor(
    private competitionService: CompetitionService
  ) { }

  ngOnInit() {
    this.competition = this.competitionService.getCompetition();
    this.getData();
  }

  getData() {
    this.loading = true;
    this.competitionService.getCompetitionScorers(this.competition.competition.id)
      .pipe(
        tap(() => this.loading = false),
        catchError(err => {
          this.loading = false;
          this.error = true;
          return err;
        })
      )
      .subscribe(data => {
        this.scorers = data.scorers;
      });
  }

}
