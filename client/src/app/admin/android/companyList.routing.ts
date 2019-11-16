import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CompanylistComponent } from './companyList/companyList.component';
import { AddCompanyComponent } from './addCompany/addCompany.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CompanylistComponent
      },
      {
        path: 'addcompany',
        component: AddCompanyComponent
      }
    ]
  }
];

export const CompanyRouting: ModuleWithProviders = RouterModule.forChild(routes);
