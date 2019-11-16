import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { RequestlistComponent } from './requestList/requestList.component';
import { RequestdetailComponent } from './requestDetail/requestDetail.component';
import { RequestlandingComponent } from './requestLanding/requestLanding.component';

const routes: Routes = [
  {
    path: '',
    component: RequestlandingComponent,
    children: [
      {
        path: '',
        component: RequestlistComponent
      },
      {
        path: 'detail/:ivrid',
        component: RequestdetailComponent
      }
    ]
  }

];

export const RequestRouting: ModuleWithProviders = RouterModule.forChild(routes);
