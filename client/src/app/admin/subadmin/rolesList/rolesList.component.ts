import { Component, OnInit } from '@angular/core';
import { ShareService } from '../../../providers';
import { constants } from '../../../constants';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-roleslist',
  templateUrl: './roleslist.component.html',
  styleUrls: ['./roleslist.component.scss']
})
export class RoleslistComponent implements OnInit {
  dataSource: any[];
  totalRecords: number;
  cols: any[];
  privilageVisible: boolean;
  privilage: any = {};
  editView: any;
  activePagination = 0;
  dt: any;

  constructor(
    private shareService: ShareService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.getData();
    this.cols = [
      { field: 'roleName', header: 'Roles' },
    ];
    sessionStorage.getItem('activeivrpagination') ?
      this.activePagination = JSON.parse(sessionStorage.getItem('activeivrpagination')) : this.activePagination = null;
  }

  pageChange(ev) {
    sessionStorage.setItem('activeivrpagination', ev.first);
  }

  getData() {
    this.shareService.getData(constants.roles).subscribe(res => {
      this.dataSource = res['roles'];
      this.totalRecords = this.dataSource.length;
    });
  }

  onSubmitprivilage(val) {
    if (this.editView) {
      this.shareService.update(constants.roles, this.privilage).subscribe(res => {
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: res['message'] });
        this.privilageVisible = false;
        this.privilage = {};
      });
    } else {
      this.shareService.postData(constants.roles, val.value).subscribe(res => {
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: res['message'] });
        this.privilageVisible = false;
        this.privilage = {};
      });
    }
    this.editView = false;
    this.getData();
  }

  deletedPrivilage(id) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this?',
      accept: () => {
        this.shareService.delete(constants.roles + id).subscribe(res => {
          this.messageService.add({ severity: 'success', summary: 'Success Message', detail: res['message'] });
          this.privilageVisible = false;
          this.privilage = {};
          this.getData();
        });
      }
    });
  }

  editprivilage(data) {
    this.privilage = data;
    this.privilageVisible = true;
    this.editView = true;
  }
}


