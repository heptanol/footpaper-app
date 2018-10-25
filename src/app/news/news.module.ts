import { NgModule } from '@angular/core';
import {NewsComponent} from './news.component';
import {NewsService} from './news.service';
import {MatButtonModule, MatCardModule, MatProgressSpinnerModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {NewsItemComponent} from './news-item/news-item.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    NewsComponent,
    NewsItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    SharedModule
  ],
  exports: [
    NewsComponent
  ],
  providers: [
    NewsService
  ],
})
export class NewsModule { }
