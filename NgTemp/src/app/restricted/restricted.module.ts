import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestrictedRoutingModule } from './restricted-routing.module';
import { RestrictedPageComponent } from './pages/restricted-page/restricted-page.component';
import { RestrictedLayoutPageComponent } from './pages/restricted-layout-page/restricted-layout-page.component';
import { MaterialModule } from '../material/material.module';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    RestrictedPageComponent,
    RestrictedLayoutPageComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    RestrictedRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class RestrictedModule { }
