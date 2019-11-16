import { Component, OnInit } from '@angular/core';
import { AuthenticationService, ShareService, HeaderService } from '../providers';
import { Router } from '@angular/router';
import { constants } from '../constants';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
	ivrLength: number;
	roles: any;

	constructor(
		private _authenticationService: AuthenticationService,
		private _shareService: ShareService,
		private _headerService: HeaderService,
		private router: Router) { }

	ngOnInit() {
		const adminData = this._authenticationService.getUser('admin');

		this._shareService.getData(constants.roles + adminData.role).subscribe(res => {
			localStorage.setItem('adminroles', JSON.stringify(res['roles'][0].privileges));
			if (res['roles'][0].privileges.includes('View_Users_List')) {
				this.router.navigateByUrl('admin/users');
			} else if (res['roles'][0].privileges.includes('View_Billing_List')) {
				this.router.navigateByUrl('admin/billing');
			} else if (res['roles'][0].privileges.includes('View_Request_List')) {
				this.router.navigateByUrl('admin/request');
			} else if (res['roles'][0].privileges.includes('View_Android_List')) {
				this.router.navigateByUrl('admin/android');
			} else if (res['roles'][0].privileges.includes('View_subadmin_List')) {
				this.router.navigateByUrl('admin/subadmin');
			} else {
				this.router.navigateByUrl('admin/users');
			}
		});

		this._shareService.postData(constants.getIvr + 'filter', { status: 'pending', viewed: false }).subscribe(res => {
			this.ivrLength = res['ivr'].length;
			this._headerService._ivrcount.next(this.ivrLength);
		});

	}
}
