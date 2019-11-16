import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShareService } from '../providers/index';
import { MessageService } from 'primeng/api';
import { constants } from '../constants';

@Component({
  selector: 'app-emailconfirmation',
  template: '<p></p>',
  styles: []
})
export class EmailConfirmationComponent implements OnInit {
  reset: any = {};
  token: any;
  paswordErrors: any;

  constructor(private route: ActivatedRoute,
    private commonService: ShareService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.token = params['id']);
    this.commonService.getData(constants.verifyUser + this.token).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Verification', detail: res['message'] });
      this.router.navigateByUrl('/');
    }, (err) => {
      this.router.navigateByUrl('/');
    });
  }

}
