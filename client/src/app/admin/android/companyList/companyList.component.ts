import { Component, OnInit } from '@angular/core';
import { ShareService } from '../../../providers';
import { constants } from '../../../constants';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-companylist',
  templateUrl: './companylist.component.html',
  styleUrls: ['./companylist.component.scss']
})
export class CompanylistComponent implements OnInit {
  dataSource: any[];
  jsonArray: any[];
  totalRecords: number;
  cols: any[];
  dt: any;
  activePagination = 0;
  jsonData: any;

  constructor(
    private shareService: ShareService,
    private messageService: MessageService) { }

  ngOnInit() {

    this.shareService.getData(constants.androidGetCompany).subscribe(res => {
      this.dataSource = res['info'];
      this.totalRecords = this.dataSource.length;
    });

    this.cols = [
      { field: 'displayName', header: 'Company Name' },
      { field: 'ivrName', header: 'IVR Name' },
      { field: 'baseKeyCode', header: 'Base Key Code' },
      { field: 'customerCare', header: 'Customer Care' },
      { field: 'logoUrl', header: 'Logo' },
      { field: 'category', header: 'category' }
    ];

    sessionStorage.getItem('activeivrpagination') ?
    this.activePagination = JSON.parse(sessionStorage.getItem('activeivrpagination')) : this.activePagination =  null;
  }

  showjsonIvr(company, name) {
    this.shareService.getData(constants.androidGetIvr + '?company=' + company + '&name=' + name).subscribe(res => {
      this.jsonArray = res['info'];
      this.jsonData = res['info'];
      document.body.classList.add('modal-open');
    });
  }

  closeModal() {
    this.jsonData = null;
    document.body.classList.remove('modal-open');
  }

  pageChange(ev) {
    sessionStorage.setItem('activeivrpagination', ev.first);
  }

  uploadToCuserve(data) {
    const payload = {
      name: data.companyName,
      ivrName: data.companyName + '-ivr-1',
      baseKeyCode: data.companyIvrNumber,
      displayName: data.companyName.replace(/\s+/g, '-').toLowerCase(),
      logoUrl: data.companyLogo,
      tagline: '',
      category: data.category,
      customerCare: data.companyIvrNumber
    };
    this.shareService.postData(constants.addCompany, payload).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Company detail uploaded sucessfully' });
    }, (err) => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.message });
    });
  }
}


