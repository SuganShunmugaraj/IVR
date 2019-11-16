import { Component, OnInit } from '@angular/core';
import { ShareService } from './../../../providers';
import { constants } from '../../../constants';
import { AuthenticationService } from './../../../providers/authentication.service';
@Component({
  selector: 'user-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  ivrID: any;
  ivrList: any;
  userInfo: any;
  userDetail: any;
  
  constructor(
    private shareService: ShareService,
    private auth: AuthenticationService) { }

  ngOnInit() {
    this.userInfo = this.auth.getUser('customer');
    this.shareService.getData(constants.getIvr + 'getByUser/' + this.userInfo._id).subscribe(res => {
      this.ivrList = res['ivr'];
    });
    this.shareService.getData(constants.getCustomer + this.userInfo._id).subscribe(res => {
      this.userDetail = res['data'][0];
    });
  }
}
