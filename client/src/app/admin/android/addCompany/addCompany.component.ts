import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShareService } from '../../../providers/share.service';
import { constants } from '../../../constants';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-addcompany',
  templateUrl: './addcompany.component.html',
  styleUrls: ['./addcompany.component.scss']
})
export class AddCompanyComponent implements OnInit {
  register: any = {};
  userId: any;
  fileToRemove: any = [];
  previewImage: any;
  fileReaded: any;
  categoryList: any;
  uploadCsv: any;
  uploadedFileName: any;

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
    this.uploadCsv = constants.uploadCsv;
  }

  onSubmitForm(formvalue) {
    const payload = {
      company: this.register.name,
      name: this.register.ivrName,
      tree:  JSON.parse(this.register.cuservejson),
      populateCheckpoints: true
    };

    this.shareService.postData(constants.addIvr, payload).subscribe((res) => {
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Cuserve Json Uploaded sucessfully' });
      this.save(formvalue);
    }, (err) => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.message });
    });
  }

  save(formvalue) {
    this.shareService.postData(constants.addCompany, this.register).subscribe((res) => {
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Company created sucessfully' });
      this.router.navigate(['/admin/android']);
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
    this.uploadedFileName = event.files[0].name;
    const response = JSON.parse(event.xhr.response);
    this.register.cuservejson = response.file;
  }

  removeImage(id, fieldname) {
    this.register[fieldname] = '';
    this.fileToRemove = [...this.fileToRemove, constants.companyImagePath + id];
  }

  removeUnusedFiles() {
    this.shareService.postData(constants.deleteFile, this.fileToRemove).subscribe(result => {
      this.fileToRemove = [];
    });
  }

}
