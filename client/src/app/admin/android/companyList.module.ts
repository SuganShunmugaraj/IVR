import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRouting } from './companyList.routing';
import { CompanylistComponent } from './companyList/companyList.component';
import { ShareModule } from '../../share/share.module';
import { AddCompanyComponent } from './addCompany/addCompany.component';

@NgModule({
  imports: [
    CommonModule,
    CompanyRouting,
    ShareModule,
  ],
  declarations: [
    CompanylistComponent,
     AddCompanyComponent
  ]
})

export class CompanylistModule { }
