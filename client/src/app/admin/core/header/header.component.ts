import { Component, OnInit } from '@angular/core';
import { AuthenticationService, HeaderService } from '../../../providers';

@Component({
  selector: 'admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  ivrLength: any;
  roles: any;

  constructor(
    private auth: AuthenticationService,
    private headerService: HeaderService) { }

  ngOnInit() {
    this.roles = localStorage.getItem('adminroles') ? JSON.parse(localStorage.getItem('adminroles')) :  this.roles = null;
    setTimeout(() => {
      this.roles = JSON.parse(localStorage.getItem('adminroles'));
    }, 500);
    this.headerService.ivrcount$.subscribe(res => {
      this.ivrLength = res;
    });
  }

  logout() {
    this.auth.logout();
  }
}
