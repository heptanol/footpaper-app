import {Component, HostListener, OnInit} from '@angular/core';
import {ResponsiveService} from '../shared/responsive/responsive.service';
import {Devices} from '../shared/responsive/responsive.model';
import {Cups, Leagues} from '../shared/nav-menu/menu.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  device: Devices;
  deviceList = Devices;
  leagues = [];
  cups = [];

  constructor(
    private responsiveService: ResponsiveService,
  ) { }

  ngOnInit() {
    this.device = this.responsiveService.detectDevice();
    this.getLeagues();
    this.getCups();
  }

  getLeagues(): void {
    const leaguesList = Leagues;
    Object.values(leaguesList).map((val) => {
      return this.leagues.push(val);
    });
  }

  getCups(): void {
    const cupsList = Cups;
    Object.values(cupsList).map((val) => {
      return this.cups.push(val);
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.device = this.responsiveService.detectDevice();
  }

  getCompetitionCols() {
    if (this.device === this.deviceList.DESKTOP) {
      return 8;
    } else if (this.device === this.deviceList.TABLET) {
      return 4;
    } else {
      return 2;
    }
  }


}
