import { Component, OnInit, OnChanges, ChangeDetectorRef, Input, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { ShareService, HeaderService } from './../../providers';
import { AuthenticationService } from './../../providers/authentication.service';
import { constants } from '../../constants';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'page-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnChanges {
  userinfo: any;
  @Input() logo: any;
  @Input() userLogged: any;
  @Input() billingLength: any;

  constructor(
    private shareService: ShareService,
    private auth: AuthenticationService,
    private headerService: HeaderService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(changes) {
    this.userinfo = this.auth.getUser('customer');
    if (this.userinfo) {
      this.shareService.getData(constants.getCustomer + this.userinfo._id).subscribe(res => {
        this.userinfo = res['data'][0];
        this.cdr.detectChanges();
      });

      this.shareService.getData(constants.getNewBills + this.userinfo._id).subscribe(res => {
        this.headerService._billingcount.next(res['bills'].length);
      });
    }
  }

  signin() {
    this.shareService.setLoginModal(true);
  }

  signout() {
    this.auth.customerLogout();
  }
}
