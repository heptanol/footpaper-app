import {Component, Input, OnInit} from '@angular/core';
import {catchError, take, tap} from 'rxjs/operators';
import {NewsService} from './news.service';
import {News} from './news.model';
import {makeStateKey, TransferState} from '@angular/platform-browser';

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
  loading = false;
  error = false;

  constructor(
    private feedService: NewsService,
    private state: TransferState
  ) {}

  ngOnInit(): void {
    this.getFeeds();
  }

  getFeeds() {
    this.news = this.state.get(NEWS_KEY, null as any);
    if (!this.news) {
      this.feedService.getNews()
        .pipe(
          tap(() => this.loading = false),
          catchError(err => {
            this.error = true;
            return err;
          })
        ).subscribe(data => {
          this.news = data;
          this.state.set(NEWS_KEY, data as any);
        });
    }
  }

}

