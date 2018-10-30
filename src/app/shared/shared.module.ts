import { NgModule } from '@angular/core';
import { OrderByPipe } from './pipe/order-by';
import { GroupByPipe } from './pipe/group-by';
import { CustomTranslateService } from './translate/translate.service';
import { ResponsiveService } from './responsive/responsive.service';
import { IconComponent } from './nav-menu/icon/icon.component';
import { MatButtonModule, MatMenuModule, MatToolbarModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './nav-menu/menu/menu.component';
import { RouterModule } from '@angular/router';
import {FooterComponent} from './footer/footer.component';
import {TeamSvgDefinitionsComponent} from './team-logo/svg-definitions/svg-definitions.component';
import {TeamSvgIconComponent} from './team-logo/svg-icon/svg-icon.component';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [
    GroupByPipe,
    OrderByPipe,
    IconComponent,
    MenuComponent,
    FooterComponent,
    TeamSvgDefinitionsComponent,
    TeamSvgIconComponent
  ],
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  exports: [
    GroupByPipe,
    OrderByPipe,
    MenuComponent,
    FooterComponent,
    TeamSvgDefinitionsComponent,
    TeamSvgIconComponent,
    TranslateModule,
  ],
  providers: [
    CustomTranslateService,
    ResponsiveService
  ],
})
export class SharedModule { }
