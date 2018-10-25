import {Injectable} from '@angular/core';
import {Breakpoint, Devices} from './responsive.model';

@Injectable()
export class ResponsiveService {

  constructor() {}

  detectDevice(): Devices {
    if (window.innerWidth > Breakpoint.DESKTOP) {
      return Devices.DESKTOP;
    } else if (window.innerWidth > Breakpoint.TABLET) {
      return Devices.TABLET;
    } else {
      return Devices.PHONE;
    }
  }

}
