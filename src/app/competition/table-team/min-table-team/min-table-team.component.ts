import {Component, Input} from '@angular/core';
import {TableTeamModel} from '../table-team.model';

@Component({
  selector: 'app-min-table-team',
  templateUrl: './min-table-team.component.html',
  styleUrls: ['./min-table-team.component.scss']
})
export class MinTableTeamComponent {
  @Input() teamTable: TableTeamModel;
}
