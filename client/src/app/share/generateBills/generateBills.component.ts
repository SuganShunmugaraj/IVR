import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { ShareService } from '../../providers/share.service';
import { constants } from '../../constants';
import { MessageService } from 'primeng/api';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-generatebills',
  templateUrl: './generatebills.component.html',
  styleUrls: ['./generatebills.component.scss']
})
export class GeneratebillsComponent implements OnInit {
  billData: any = {
    items: [],
    subtotal: 0
  };
  billForm: any;
  cartItems: any = {};
  customerList: any;
  viewOnly: Boolean;
  @Input() data: any;
  @Output() generateBillModalDispay = new EventEmitter;

  constructor(
    private shareService: ShareService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.data ? (this.billData = this.data, this.viewOnly = true) : this.billData = null;
    this.shareService.getData(constants.getCustomer).subscribe(res => {
      const customer = res['customer'];
      this.customerList = [{ label: 'Select Customer', value: null }];
      customer.forEach((element, index) => {
        this.customerList = [...this.customerList, { label: element.name, value: element._id }];
      });
    });
  }

  generateBill({ value }) {
    this.addItems();
    this.billData.total = this.billData.subtotal + (this.billData.tax / 100) * this.billData.subtotal;
    this.billData.billId = Math.floor(Math.random() * 90000) + 10000;
    this.shareService.postData(constants.bills, this.billData).subscribe(res => {
      this.messageService.add({ severity: 'sucess', summary: 'Sucess Message', detail: res['message'] });
      this.close();
    }, (err) => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.message });
      this.close();
    });
  }

  addItems() {
    this.billData.items = [...this.billData.items, this.cartItems];
    this.cartItems = {};
  }

  close() {
    this.generateBillModalDispay.emit(false);
  }

  getSubTotal(items) {
    if (items.valid) {
      this.billData.subtotal = this.billData.subtotal + (items.value.calls * items.value.cost);
    }
  }

  captureScreen() {
    const data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      const imgWidth = 208;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('cuserve.pdf');
    });
  }

}
