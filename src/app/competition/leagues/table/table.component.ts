import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {CompetitionService} from '../../competition.service';
import {Standing, StandingType, TableTeamModel} from '../../table-team/table-team.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {

  @Input()standings: Standing[];
  tables: TableTeamModel[];
  constructor(
    private competitionService: CompetitionService
  ) {}

  ngOnInit() {
    this.standings = this.competitionService.getCompetition().standings;
    this.getData();
  }

  getData() {
    this.standings.filter(value => value.type === StandingType.TOTAL)
      .map((val: Standing) => this.tables = val.table);
  }

  ngAfterViewInit(): void {
  }

}
