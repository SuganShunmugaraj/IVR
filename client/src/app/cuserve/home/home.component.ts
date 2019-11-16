import { Component, OnInit } from '@angular/core';
import { ShareService } from './../../providers/share.service';
import { constants } from './../../constants';
import { AuthenticationService } from './../../providers/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  bannerImage: any;
  imagepath: any;
  isLogged: any;

  constructor(
    private shareService: ShareService,
    private auth: AuthenticationService) { }

  ngOnInit() {
     this.auth.getLoginState('customer').subscribe(res => {
      this.isLogged = res;
    });
  }

  signindisplay(view) {
    this.shareService.setLoginModal(view);
  }

}
