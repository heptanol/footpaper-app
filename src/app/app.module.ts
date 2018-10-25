import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NewsModule } from './news/news.module';
import { Routing } from './app.routing';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatGridListModule, MatSidenavModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {SharedModule} from './shared/shared.module';
import {HomeComponent} from './home/home.component';
import {CompetitionModule} from './competition/competition.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'footpaper-app' }),
    NewsModule,
    SharedModule,
    Routing,
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    CommonModule,
    CompetitionModule,
    HttpClientModule,
    MatSidenavModule,
    MatGridListModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
