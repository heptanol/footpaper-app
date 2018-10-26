import {Component, Input, OnInit} from '@angular/core';
import {Standing, StandingType} from '../../table-team/table-team.model';
import {CompetitionService} from '../../competition.service';

@Component({
  selector: 'app-table-cl',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableClComponent implements OnInit {

  @Input()standings: Standing[];
  tables = [];
  constructor(
    private competitionService: CompetitionService
  ) {}

  ngOnInit() {
    this.standings = this.competitionService.getCompetition().standings;
    this.getData();
  }

  getData() {
    this.standings.filter(value => value.type === StandingType.TOTAL)
      .map((val: Standing) => this.tables.push(val));
  }

}
