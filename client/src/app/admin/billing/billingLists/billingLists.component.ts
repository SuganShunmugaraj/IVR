import { Component, OnInit } from '@angular/core';
import { ShareService } from '../../../providers';
import { constants } from '../../../constants';

@Component({
  selector: 'app-billinglists',
  templateUrl: './billinglists.component.html',
  styleUrls: ['./billinglists.component.scss']
})
export class BillinglistsComponent implements OnInit {
  dataSource: any[];
  totalRecords: number;
  cols: any[];
  generateBillDisplay: boolean;
  activePagination: Number = 0;

  constructor(private shareService: ShareService) { }

  ngOnInit() {
    this.getData();
    this.cols = [
      { field: 'billTo.companyName', header: 'Company Name' },
      { field: 'billTo.name', header: 'Account Holder' }
    ];
    sessionStorage.getItem('activeivrpagination') ?
      this.activePagination = JSON.parse(sessionStorage.getItem('activeivrpagination')) : this.activePagination = null;
  }

  pageChange(ev) {
    sessionStorage.setItem('activeivrpagination', ev.first);
  }

  generateBillModalDispay(ev) {
    this.generateBillDisplay = ev.value;
    setTimeout(() => {
      this.getData();
    }, 1000);
  }

  getData() {
    this.shareService.getData(constants.bills).subscribe(res => {
      this.dataSource = res['bills'];
      this.totalRecords = this.dataSource.length;
    });
  }
}


