import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShareService } from '../../../providers/share.service';
import { constants } from '../../../constants';
import {   MessageService } from 'primeng/api';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  editType: boolean;
  register: any = {};
  userId: any;
  passwordVisible: boolean;
  fileToRemove: any = [];
  previewImage: any;
  categoryList: any;
  companyLogoApi: any;
  constructor(
    private route: ActivatedRoute,
    private shareService: ShareService,
    private router: Router,
    private messageService: MessageService) {
      this.categoryList = [
        { label: 'Select Category', value: null },
        { label: 'Banking', value: 'banking' },
        { label: 'Telecom', value: 'telecom' },
        { label: 'Finance', value: 'finance' },
        { label: 'other', value: 'other' }
      ];
     }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userid'];
      this.userId ? (this.editType = true, this.getuserDetail()) : this.editType = false;
    });
    this.companyLogoApi = constants.uploadCompanLogo;
  }

  getuserDetail() {
    this.shareService.getData(constants.getCustomer + this.userId).subscribe((res) => {
      this.register = res['data'][0];
    }, (err) => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.message });
    });
  }

  onSubmitForm(formvalue) {
    this.userId ? this.update(formvalue) : this.save(formvalue);
  }

  save(formvalue) {
    this.shareService.postData(constants.userRegister, this.register).subscribe((res) => {
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'user created sucessfully' });
      this.router.navigate(['/admin/users']);
      formvalue.reset();
      this.removeUnusedFiles();
    }, (err) => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.message });
    });
  }

  update(formvalue) {
    this.shareService.update(constants.getCustomer + this.userId, this.register).subscribe((res) => {
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'user uptated sucessfully' });
        this.removeUnusedFiles();
    }, (err) => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.message });
    });
  }

  onUpload(event, fieldname) {
    const response = JSON.parse(event.xhr.response);
    this.register[fieldname] =   response.file[0].base64data;
  }

  viewImage(image) {
    this.previewImage =   this.register.companyLogo;
  }

  removeImage(id, fieldname) {
    this.register[fieldname] = '';
    this.previewImage = false;
    this.fileToRemove = [...this.fileToRemove, constants.companyImagePath + id];
  }

  removeUnusedFiles() {
    this.shareService.postData(constants.deleteFile, this.fileToRemove).subscribe(result => {
      this.fileToRemove = [];
    });
  }

}
