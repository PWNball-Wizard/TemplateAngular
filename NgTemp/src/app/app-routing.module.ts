import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFound404Component } from './shared/pages/not-found404/not-found404.component';
import { AuthGuardGuard } from './auth/guards/auth-guard.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'restricted',
    loadChildren: () => import('./restricted/restricted.module').then(m => m.RestrictedModule),
  },
  {
    path: '',
    redirectTo: 'restricted',
    pathMatch: 'full',//!si no lo coloco me arroja un error, esto porque el path '' ya esta siendo utilizado por el path 'restricted'
  },
  {
    path: '**',
    component: NotFound404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
