import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestrictedPageComponent } from './pages/restricted-page/restricted-page.component';
import { RestrictedLayoutPageComponent } from './pages/restricted-layout-page/restricted-layout-page.component';

const routes: Routes = [
  {
    path: '',
    component: RestrictedLayoutPageComponent,
    children: [
      {
        path: 'inicio',
        component: RestrictedPageComponent,
      },
      {
        path: '**',
        redirectTo: 'inicio',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestrictedRoutingModule {}
