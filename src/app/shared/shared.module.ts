import { NgModule } from '@angular/core';
import { OrderByPipe } from './pipe/order-by';
import { GroupByPipe } from './pipe/group-by';
import { CustomTranslateService } from './translate/translate.service';
import { ResponsiveService } from './responsive/responsive.service';
import { IconComponent } from './nav-menu/icon/icon.component';
import {MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule} from '@angular/material';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './nav-menu/menu/menu.component';
import { RouterModule } from '@angular/router';
import {FooterComponent} from './footer/footer.component';
import {TeamSvgDefinitionsComponent} from './team-logo/svg-definitions/svg-definitions.component';
import {TeamSvgIconComponent} from './team-logo/svg-icon/svg-icon.component';
import {TranslateModule} from '@ngx-translate/core';
import {HeaderService} from './header/header.service';


@NgModule({
  declarations: [
    MenuComponent,
    GroupByPipe,
    OrderByPipe,
    IconComponent,
    FooterComponent,
    TeamSvgDefinitionsComponent,
    TeamSvgIconComponent
  ],
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  exports: [
    MenuComponent,
    GroupByPipe,
    OrderByPipe,
    FooterComponent,
    TeamSvgDefinitionsComponent,
    TeamSvgIconComponent,
    TranslateModule,
  ],
  providers: [
    CustomTranslateService,
    ResponsiveService,
    HeaderService
  ],
})
export class SharedModule { }
