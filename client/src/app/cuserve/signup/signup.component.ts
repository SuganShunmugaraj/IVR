import { Component, OnInit, Input, ElementRef, Renderer, OnChanges } from '@angular/core';
import { ShareService } from './../../providers/share.service';
import { constants } from '../../constants';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../providers';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  forgetForm: boolean;
  @Input() view: any;
  loginForm: any;
  previewImage: any;
  registerForm: any;
  userDetail: any = {};
  registerdetail: any = {};
  resetdetail: any = {};
  registerstep2 = false;
  errorMessage: string;
  emailvalidate: string;
  forgetPassForm: any;
  categoryList: any;
  companyLogoApi: string;
  uploadedFiles: any[] = [];
  fileToRemove: any = [];

  constructor(
    private shareService: ShareService,
    private auth: AuthenticationService,
    private messageService: MessageService,
    private router: Router) {
    this.categoryList = [
      { label: 'Select Category', value: null },
      { label: 'Banking', value: 'banking' },
      { label: 'Telecom', value: 'telecom' },
      { label: 'Finance', value: 'finance' },
      { label: 'other', value: 'other' }
    ];
  }

  ngOnInit() {
    this.forgetForm = false;
    this.companyLogoApi = constants.uploadCompanLogo;
    this.settingLogin();
  }

  settingLogin() {
    if (localStorage.getItem('cuserveUserValue')) {
      const storeddata = JSON.parse(localStorage.getItem('cuserveUserValue'));
      this.userDetail = storeddata;
    }
  }

  onRegister(val) {
    this.shareService.postData(constants.userRegister, this.registerdetail).subscribe((res) => {
      this.view = 'emailverification';
      this.removeUnusedFiles();
    }, (err) => {
      this.errorMessage = err.error.message;
    });
  }

  onLogin() {
    if (this.userDetail.remember) {
      localStorage.setItem('cuserveUserValue', JSON.stringify(this.userDetail));
    } else {
      localStorage.removeItem('cuserveUserValue');
    }

    this.shareService.postData(constants.userLogin, this.userDetail).subscribe(res => {
      this.auth.saveToken(res.user, res.token);
      this.messageService.add({ severity: 'success', summary: 'Sucess', detail: 'You have Sucessfull Logged in' });
      this.close();
      this.router.navigateByUrl('/dashboard');
    }, (err) => {
      this.errorMessage = err.error.message;
    });
  }

  onForgetPass() {
    this.shareService.postData(constants.getCustomer + 'forgetpass', this.resetdetail).subscribe(res => {
      if (res['success']) {
        this.messageService.add({ severity: 'success', summary: 'Sucess', detail: res['message'] });
        this.close();
      } else {
        this.errorMessage = res['message'];
      }
    }, (err) => {
      this.errorMessage = err.error.message;
    });
  }

  onUpload(event, fieldname) {
    const response = JSON.parse(event.xhr.response);
    this.registerdetail[fieldname] = response.file[0].base64data;
  }

  checkEmailValidation(value, validation) {
    if (validation) {
      this.shareService.postData(constants.getCustomer + 'findCustomerExists', { email: value }).subscribe(res => {
        this.emailvalidate = res['exists'];
      });
    }
  }

  viewImage(image) {
    this.previewImage = image;
  }

  removeImage(id, fieldname) {
    this.registerdetail[fieldname] = '';
    this.previewImage = null;
    this.fileToRemove = [...this.fileToRemove, constants.companyImagePath + id];
  }

  removeUnusedFiles() {
    this.shareService.postData(constants.deleteFile, this.fileToRemove).subscribe(result => {
      this.fileToRemove = [];
    });
  }

  close() {
    this.resetdetail = {};
    this.registerdetail = {};
    this.userDetail = {};
    this.shareService.setLoginModal(false);
    this.registerstep2 = false;
    this.previewImage = null;
    this.settingLogin();
  }

}
