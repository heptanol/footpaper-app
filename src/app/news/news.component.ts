import {Component, Input, OnInit} from '@angular/core';
import {NewsService} from './news.service';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import {HeaderService} from '../shared/header/header.service';
import {TranslateService} from '@ngx-translate/core';
import {take} from 'rxjs/operators';

const NEWS_KEY = makeStateKey('news');

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  news: any;
  @Input() isBloc = false;
  @Input() limit = 100;
  error = false;

  constructor(
    private feedService: NewsService,
    private state: TransferState,
    private headerService: HeaderService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    if (!this.isBloc) {
      this.translateService.get('menu.news').pipe(take(1))
        .subscribe(value => this.headerService.setSubTitle(value));
    }
    this.getFeeds();
  }

  getFeeds() {
    this.news = this.state.get(NEWS_KEY, null as any);
    if (!this.news) {
      this.feedService.getNews()
        .subscribe(data => {
          this.news = data;
          this.state.set(NEWS_KEY, data as any);
        });
    }
  }

}

