import {Component, HostListener, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {catchError, tap} from 'rxjs/operators';
import {Devices} from '../../shared/responsive/responsive.model';
import {CompetitionService} from '../competition.service';
import {ResponsiveService} from '../../shared/responsive/responsive.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit, OnDestroy, OnChanges {
  fixtures: any[];
  subscribtion: Subscription[] = [];
  loading = false;
  error = false;
  device: Devices;
  deviceList = Devices;
  @Input() isBloc = false;
  constructor(
    private competitionService: CompetitionService,
    private responsiveService: ResponsiveService,
  ) {}

  ngOnInit() {
    this.device = this.responsiveService.detectDevice();
    this.getData();
  }

  ngOnChanges() {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.subscribtion.push(this.competitionService.getTodayMatches()
      .pipe(
        tap(() => this.loading = false),
        catchError(err => {
          this.loading = false;
          this.error = true;
          return err;
        })
      )
      .subscribe(data => {
        this.fixtures = data;
      }));
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.device = this.responsiveService.detectDevice();
  }

  ngOnDestroy() {
    this.subscribtion.forEach(sub => sub.unsubscribe());
  }


}
