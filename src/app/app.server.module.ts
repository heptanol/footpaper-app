import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { TranslateUniversalLoader } from './translate.service';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateUniversalLoader
      }
    }),
    ServerTransferStateModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule { }
