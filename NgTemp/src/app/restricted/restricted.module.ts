import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestrictedRoutingModule } from './restricted-routing.module';
import { RestrictedPageComponent } from './pages/restricted-page/restricted-page.component';
import { RestrictedLayoutPageComponent } from './pages/restricted-layout-page/restricted-layout-page.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    RestrictedPageComponent,
    RestrictedLayoutPageComponent
  ],
  imports: [
    CommonModule,
    RestrictedRoutingModule,
    MaterialModule
  ]
})
export class RestrictedModule { }
