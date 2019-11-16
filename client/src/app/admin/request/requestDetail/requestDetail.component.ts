import { Component, OnInit } from '@angular/core';
import { ShareService, HeaderService } from '../../../providers';
import { constants } from '../../../constants';
import { ConfirmationService, MessageService } from 'primeng/api';
import {  ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-requestdetail',
  templateUrl: './requestdetail.component.html',
  styleUrls: ['./requestdetail.component.scss']
})
export class RequestdetailComponent implements OnInit {
  ivrID: any;
  ivrDetail: any;
  updateStatus: any;
  ivrLength: any;
  constructor(
    private shareService: ShareService,
    private headerService: HeaderService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit() {

    this.headerService.ivrcount$.subscribe(res => {
      this.ivrLength = res;
    });

    this.route.params.subscribe(params => {
      this.ivrID = params['ivrid'];
      this.shareService.getData(constants.getIvr + this.ivrID).subscribe(res => {
        this.ivrDetail = res['ivr'][0];
        if (!this.ivrDetail.viewed) {
          this.ivrDetail.viewed = true;
          this.shareService.update(constants.getIvr + this.ivrID  , this.ivrDetail ).subscribe(data => {
            this.headerService._ivrcount.next(this.ivrLength - 1);
          });
        }
      });
    });
  }

  statuChange(accept) {
    let message;
    let ivrStatus;
    if (accept) {
      message = 'Are you sure that you want to accept?';
      ivrStatus = 'approved';
    } else {
      message = 'Are you sure that you want to decline?';
      ivrStatus = 'declined';
    }

    this.confirmationService.confirm({
      message: message,
      accept: () => {
        this.ivrDetail.status = ivrStatus;
        this.shareService.update(constants.getIvr + this.ivrDetail._id, this.ivrDetail).subscribe(res => {
          this.messageService.add({ severity: 'sucess', summary: 'Sucess Message', detail: res['message'] });
          this.updateStatus = true;
        });
      },
      reject: () => { }
    });
  }

}
