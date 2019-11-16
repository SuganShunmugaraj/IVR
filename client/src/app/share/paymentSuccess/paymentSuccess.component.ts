import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShareService } from '../../providers/index';
import { MessageService } from 'primeng/api';
import { constants } from '../../constants';

@Component({
  selector: 'app-paymentsucess',
  template: '<p> paymentsucess works! </p>',
  styles: ['p:{ float: left; width: 100%; text-align: center; font-size: 20px;  margin: 50px 0 0 0; }']
})
export class PaymentsucessComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commonService: ShareService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.commonService.postData(constants.paymentSuccess, params).subscribe(res => {
        this.messageService.add({ severity: 'sucess', summary: 'Payment Sucessfull', detail: res['message'] });
        this.router.navigateByUrl('/home');
      });
    });
  }

}
