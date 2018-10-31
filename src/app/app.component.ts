import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Devices} from './shared/responsive/responsive.model';
import {ResponsiveService} from './shared/responsive/responsive.service';
import {CustomTranslateService} from './shared/translate/translate.service';
import {HeaderService} from './shared/header/header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  device: Devices;
  deviceList = Devices;
  constructor(
    private responsiveService: ResponsiveService,
    private translateService: CustomTranslateService,
    private header: HeaderService
  ) {
    translateService.setLangue();
    header.setTitle();
    header.setMeta();
  }

  ngOnInit() {
    this.device = this.responsiveService.detectDevice();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.device = this.responsiveService.detectDevice();
  }

  getSideNavMode(): string {
    if (this.device === Devices.DESKTOP) {
      return 'side';
    }
    return 'push';
  }

  ngOnDestroy(): void {}
}
