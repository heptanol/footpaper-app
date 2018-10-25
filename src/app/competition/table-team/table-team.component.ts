import {Component, Input} from '@angular/core';
import {TableTeamModel} from './table-team.model';

@Component({
  selector: 'app-table-team',
  templateUrl: './table-team.component.html',
  styleUrls: ['./table-team.component.scss']
})
export class TableTeamComponent {

  @Input() teamTable: TableTeamModel;
}

