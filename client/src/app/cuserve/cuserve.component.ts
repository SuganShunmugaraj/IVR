import { Component, OnInit } from '@angular/core';
import { ShareService, AuthenticationService, HeaderService } from './../providers/';

@Component({
  selector: 'app-cuserve',
  templateUrl: './cuserve.component.html',
  styleUrls: ['./cuserve.component.scss']
})
export class CuserveComponent implements OnInit {
  userLogin: any;
  logo: any;
  isLogged: any;
  locationDisplay: any;
  locationData: any;
  billingLength: any;

  constructor(
    private shareService: ShareService,
    private auth: AuthenticationService,
    private headerService: HeaderService) { }


  ngOnInit() {
    this.auth.getLoginState('customer').subscribe(res => {
      this.isLogged = res;
    });

    this.shareService.getLoginModal().subscribe(res => {
      this.userLogin = res;
    });

    this.headerService.billingCount$.subscribe(res => {
      this.billingLength = res;
    });
  }
}
