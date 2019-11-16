import { Component, OnInit } from '@angular/core';
import { ShareService } from '../../../providers';
import { constants } from '../../../constants';

@Component({
  selector: 'app-requestlist',
  templateUrl: './requestlist.component.html',
  styleUrls: ['./requestlist.component.scss']
})
export class RequestlistComponent implements OnInit {
  dataSource: any[];
  totalRecords: number;
  cols: any[];
  generateBillDisplay: boolean;
  activePagination = 0;

  constructor(private shareService: ShareService) { }

  ngOnInit() {
    this.getData();
    this.cols = [
      { field: 'ivrName', header: 'IVR Name' },
      { field: 'createdBy', header: 'Company Name' },
      { field: 'createdBy', header: 'Account Holder' },
      { field: 'companyAddress1', header: 'Place' },
    ];
    sessionStorage.getItem('activeivrpagination') ?
      this.activePagination = JSON.parse(sessionStorage.getItem('activeivrpagination')) : this.activePagination = null;
  }

  pageChange(ev) {
    sessionStorage.setItem('activeivrpagination', ev.first);
  }

  generateBillModalDispay(ev) {
    this.generateBillDisplay = ev.value;
    this.getData();
  }

  getData() {
    this.shareService.postData(constants.getIvr + 'filter', { status: 'pending' }).subscribe(res => {
      this.dataSource = res['ivr'];
      this.totalRecords = this.dataSource.length;
    });
  }

}


