import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restricted-layout-page',
  templateUrl: './restricted-layout-page.component.html',
  styleUrls: ['./restricted-layout-page.component.css'],
})
export class RestrictedLayoutPageComponent {
  public sideNavItems = [
    { url: '/restricted/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { url: '/restricted/contacts', label: 'Contacts', icon: 'contacts' },
    { url: '/restricted/leads', label: 'Leads', icon: 'leads' },
  ];

  public matMenuItems = [
    {
      url: '/restricted/usuario',
      label: 'Perfil de usuario',
      icon: 'manage_accounts',
      action: () => this.redirectUserProfile(),
    },
    {
      url: '/auth/login',
      label: 'Cerrar sesion',
      icon: 'logout',
      action: () => this.logout(),
    },
    //{url: '/auth/register', label: 'Cerrar sesion', icon:'logout', action: () => this.logout()},
  ];

  logout() {
    console.log('Sesion cerrada');
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
  }

  redirectUserProfile() {
    console.log('Redirigiendo a user profile');
    this.router.navigateByUrl('/restricted/usuario');
  }

  constructor(private router: Router) {}
}
