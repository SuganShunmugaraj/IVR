import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ShareService } from './../../providers/share.service';
import { constants } from '../../constants';
import { AuthenticationService } from '../../providers';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage: any;
  credentials = {
    email: '',
    password: ''
  };

  constructor(
    private shareService: ShareService,
    private router: Router,
    private auth: AuthenticationService
  ) { }

  ngOnInit() { }

  login() {
    this.shareService.postData(constants.login, this.credentials).subscribe((res) => {
      this.auth.saveToken(res.user, res.token);
      this.router.navigateByUrl('/admin');
    }, (err) => {
      this.errorMessage = err.error.message;
    });
  }

}
