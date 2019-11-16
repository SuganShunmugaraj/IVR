import { Component, OnInit } from '@angular/core';
import { ShareService } from '../../../providers';
import { constants } from '../../../constants';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-billingdetail',
  templateUrl: './billingdetail.component.html',
  styleUrls: ['./billingdetail.component.scss']
})
export class BillingdetailComponent implements OnInit {
  dataSource: any[];
  totalRecords: number;
  cols: any[];
  billId: any;
  selectedBill: any;
  activePagination = 0;
  generateBillDisplay: boolean;

  constructor(
    private route: ActivatedRoute,
    private shareService: ShareService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.billId = params['id'];
      this.shareService.getData(constants.bills + this.billId).subscribe(res => {
        this.dataSource = res['bills'];
        this.totalRecords = this.dataSource.length;
      });
    });

    this.cols = [
      { field: 'createdAt', header: 'Bill Date' },
      { field: 'billId', header: 'Bill No' },
      { field: 'total', header: 'Amount' },
      { field: 'paymentStatus', header: 'Payment Status' }
    ];

    sessionStorage.getItem('activeivrpagination') ?
      this.activePagination = JSON.parse(sessionStorage.getItem('activeivrpagination')) : this.activePagination = null;
  }

  pageChange(ev) {
    sessionStorage.setItem('activeivrpagination', ev.first);
  }

  generateBillModalDispay(ev) {
    this.generateBillDisplay = ev.value;
    this.selectedBill = null;
  }

  remind(data) {
    data.remind++;
    this.shareService.update(constants.bills + data._id, data).subscribe(res => {
      this.messageService.add({ severity: 'sucess', summary: 'Sucess Message', detail: 'Reminder to the customer sent sucessfully' });
    }, (err) => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.message });
    });

    this.shareService.postData(constants.bills + 'sendReminder', data).subscribe(res => {
    }, (err) => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.message });
    });
  }

  viewBilling(data) {
    this.selectedBill = data;
    this.selectedBill ? this.generateBillDisplay = true : this.generateBillDisplay = null;
  }

}


