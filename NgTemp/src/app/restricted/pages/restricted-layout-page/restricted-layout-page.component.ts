import { Component } from '@angular/core';

@Component({
  selector: 'app-restricted-layout-page',
  templateUrl: './restricted-layout-page.component.html',
  styleUrls: ['./restricted-layout-page.component.css']
})
export class RestrictedLayoutPageComponent {

  public sideNavItems = [
    {url: '/restricted/dashboard', label: 'Dashboard', icon: 'dashboard'},
    {url: '/restricted/contacts', label: 'Contacts', icon: 'contacts'},
    {url: '/restricted/leads', label: 'Leads', icon: 'leads'},
  ];

}
