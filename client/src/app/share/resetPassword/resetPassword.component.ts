import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShareService } from '../../providers/index';
import { MessageService } from 'primeng/api';
import { constants } from '../../constants';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  reset: any = {};
  token: any;
  paswordErrors: any;

  constructor(private route: ActivatedRoute,
    private commonService: ShareService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.token = params['id']);
  }

  resetsubmit({ value, error }) {
    if (value.confirmpass !== value.password) {
      this.paswordErrors = true;
    } else {
      this.paswordErrors = false;
      value.token = this.token;
      this.commonService.postData(constants.getCustomer + 'updatepass', value).subscribe(res => {
        this.messageService.add({ severity: 'success', summary: 'Password Sucessfully Updated', detail: res['msg'] });
        this.router.navigateByUrl('/');
      });
    }
  }

}
