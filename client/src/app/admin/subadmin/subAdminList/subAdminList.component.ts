import { Component, OnInit } from '@angular/core';
import { ShareService } from '../../../providers';
import { constants } from '../../../constants';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-subadminlist',
  templateUrl: './subadminlist.component.html',
  styleUrls: ['./subadminlist.component.scss']
})
export class SubadminlistComponent implements OnInit {
  dataSource: any[];
  totalRecords: number;
  cols: any[];
  dt: any;
  ds: any;
  display: any;
  activePagination = 0;
  privilageVisible: boolean;
  subadmins: any = {};
  subadminsForm: any;
  roleslist: any = [];
  
  constructor(
    private shareService: ShareService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email Address' },
      { field: 'createdAt', header: 'Created' },
      { field: 'role', header: 'Roles' },
    ];

    this.roleslist = [
      { label: 'Select Roles', value: null }
    ];

    this.shareService.getData(constants.roles).subscribe(res => {
      res['roles'].forEach(element => {
        if (element.roleName !== 'Admin') {
          this.roleslist = [...this.roleslist, { label: element.roleName, value: element._id }];
        }
      });
    });

    this.getSubadmin();

    sessionStorage.getItem('activeivrpagination') ?
      this.activePagination = JSON.parse(sessionStorage.getItem('activeivrpagination')) : this.activePagination = null;
  }

  pageChange(ev) {
    sessionStorage.setItem('activeivrpagination', ev.first);
  }

  getSubadmin() {
    this.shareService.getData(constants.getUsers).subscribe(res => {
      this.dataSource = res['data'];
      this.totalRecords = this.dataSource.length;
    });
  }

  showDialog(data) {
    if (data) {
      this.subadmins = data;
    } else {
      this.subadmins = {};
    }
    this.display = true;
  }

  onSubmitCoupon(subadminform) {
    const data = this.subadmins;
    this.display = false;
    if (data._id) {
      this.updateSubadmin(data);
    } else {
      this.addSubAdmin(data);
    }
  }

  addSubAdmin({ value }) {
    const data = this.subadmins;
    this.display = false;
    this.shareService.postData(constants.register, data).subscribe(res => {
      this.getSubadmin();
      this.messageService.add({ severity: 'sucess', summary: 'Sucess Message', detail: 'Added Sucessfuly' });
    });
  }

  updateSubadmin(data) {
    this.shareService.update(constants.getUsers, data).subscribe((res) => {
      this.messageService.add({ severity: 'sucess', summary: 'Sucess Message', detail: 'Updated Sucessfuly' });
    });
  }

  onDeleteCoupon(val, ind) {
    this.shareService.delete(constants.getUsers + val._id).subscribe(res => {
      const index = ind;
      this.dataSource = this.dataSource.filter((data, i) => i !== index);
      this.messageService.add({ severity: 'sucess', summary: 'Sucess Message', detail: 'Deleted Sucessfuly' });
    });
  }

}


