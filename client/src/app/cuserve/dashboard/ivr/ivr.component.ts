import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShareService } from '../../../providers/share.service';
import { constants } from '../../../constants';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'user-ivr',
  templateUrl: './ivr.component.html',
  styleUrls: ['./ivr.component.scss']
})
export class UserIvrComponent implements OnInit {
  editType: boolean;
  register: any = {};
  userId: any;
  dataSource: any;
  cols: any;
  totalRecords: any = 10;
  activePagination = 0;
  constructor(
    private route: ActivatedRoute,
    private shareService: ShareService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userid'];
      this.userId ? (this.editType = true, this.getuserDetail()) : this.editType = false;
    });

    this.cols = [
      { field: 'ivrName', header: 'IVR Name' },
      { field: 'createdAt', header: 'Created At' },
      { field: 'createdBy.name', header: 'Created By' },
      { field: 'approved', header: 'Status' }
    ];

    sessionStorage.getItem('activeivrpagination') ?
      this.activePagination = JSON.parse(sessionStorage.getItem('activeivrpagination')) : this.activePagination = null;

  }

  pageChange(ev) {
    sessionStorage.setItem('activeivrpagination', ev.first);
  }
  getuserDetail() {
    this.shareService.getData(constants.getCustomer + this.userId).subscribe((res) => {
      this.register = res['data'][0];
    }, (err) => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.message });
    });

    this.shareService.getData(constants.getIvr + 'getByUser/' + this.userId).subscribe((res) => {
      this.dataSource = res['ivr'];
    }, (err) => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.message });
    });
  }

  deleteIvr(data, i) {
    this.confirmationService.confirm({
      message: 'Are you sure want to delete?',
      accept: () => {
        this.shareService.delete(constants.getIvr + data._id).subscribe(res => {
          this.getuserDetail();
          this.messageService.add({ severity: 'sucess', summary: 'Deleted Sucessfully', detail: res['message'] });
        });
      }
    });
  }
}
