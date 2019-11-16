import { Component, OnInit } from '@angular/core';
import { ShareService } from '../../../providers';
import { constants } from '../../../constants';

@Component({
  selector: 'app-userlists',
  templateUrl: './userlists.component.html',
  styleUrls: ['./userlists.component.scss']
})
export class UserlistsComponent  implements OnInit {
  dataSource: any[];
  totalRecords: number;
  cols: any[];
  dt: any;
  activePagination = 0;

  constructor( private shareService: ShareService) { }

  ngOnInit() {
    this.shareService.getData(constants.getCustomer).subscribe(res => {
      this.dataSource = res['customer'];
       this.totalRecords = this.dataSource.length;
    });

    this.cols = [
      { field: 'companyName', header: 'Company Name' },
      { field: 'Logo', header: 'Company Logo' },
      { field: 'createdAt', header: 'Joining Date' },
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email Address' },
      { field: 'phone', header: 'Phone Number' },
    ];
    sessionStorage.getItem('activeivrpagination') ?
     this.activePagination =  JSON.parse(sessionStorage.getItem('activeivrpagination')) :  this.activePagination = null;
  }

  pageChange(ev) {
    sessionStorage.setItem('activeivrpagination' , ev.first);
  }

}


