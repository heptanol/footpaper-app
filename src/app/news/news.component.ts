import {Component, Input, OnInit} from '@angular/core';
import {NewsService} from './news.service';
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
        .subscribe(data => {
          this.news = data;
          this.state.set(NEWS_KEY, data as any);
        });
    }
  }

}

