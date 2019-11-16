import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShareService, HeaderService } from '../../../providers/';
import { constants } from '../../../constants';
import { MessageService } from 'primeng/api';
declare let window: Window;

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  account: any = {};
  editType: boolean;
  userId: any;
  dataSource: any;
  totalRecords: any;
  register: any;
  cols: any;
  dt: any;
  activePagination = 0;
  billingCount: number;
  generateBillDisplay: any;
  selectedBill: any;

  constructor(
    private route: ActivatedRoute,
    private shareService: ShareService,
    private router: Router,
    private headerService: HeaderService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userid'];
      this.userId ? (this.editType = true, this.getuserDetail()) : this.editType = false;
    });

    this.getBillingListData();

    this.headerService.billingCount$.subscribe(res => {
      this.billingCount = res;
    });

    this.cols = [
      { field: 'createdAt', header: 'Bill Date' },
      { field: 'billno', header: 'Bill No' },
      { field: 'total', header: 'Amount' },
      { field: 'paymentStatus', header: 'Payment Status' },
    ];
    sessionStorage.getItem('activeivrpagination') ?
      this.activePagination = JSON.parse(sessionStorage.getItem('activeivrpagination')) : this.activePagination = null;
  }

  pageChange(ev) {
    sessionStorage.setItem('activeivrpagination', ev.first);
  }

  getBillingListData() {
    this.shareService.getData(constants.bills + this.userId).subscribe(res => {
      this.dataSource = res['bills'];
      this.totalRecords = this.dataSource.length;
    });
  }

  getuserDetail() {
    this.shareService.getData(constants.getCustomerAccount + this.userId).subscribe((res) => {
      res['success'] ? this.account = res['customeraccounts'][0] : this.account = null;
    }, (err) => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.message });
    });
    this.shareService.getData(constants.getCustomer + this.userId).subscribe((res) => {
      this.register = res['data'][0];
    }, (err) => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.message });
    });
  }

  onSubmitForm(data) {
    const payload = data.value;
    payload.customer = this.userId;
    this.shareService.postData(constants.getCustomerAccount + this.userId, payload).subscribe((res) => {
      this.messageService.add({ severity: 'sucess', summary: 'Sucess Message', detail: res['message'] });
    }, (err) => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.message });
    });
  }

  generateBillModalDispay(ev) {
    this.generateBillDisplay = ev.value;
    this.getBillingListData();
  }

  viewBilling(data) {
    if (!data.viewed) {
      data.viewed = true;
      this.shareService.update(constants.bills + data._id, data).subscribe(res => {
        const count = (this.billingCount - 1);
        this.headerService._billingcount.next(count);

      });
    }
    this.selectedBill = data;
    this.selectedBill ? this.generateBillDisplay = true : this.generateBillDisplay = false;
  }

  paybypal(price) {
    this.shareService.postData(constants.getPaypal, { price: price }).subscribe(res => {

      window.location.href = res['url'];
    });
  }

  valueChange(value, max, newID) {
    if (value.length === max) {
      newID.focus();
    }
  }

  keypressCardNumber(ev) {
    const ccLength = ev.target.value.length;
    if (ccLength === 4 || ccLength === 9 || ccLength === 14) {
      ev.target.value = ev.target.value + '-';
    }
  }
}
