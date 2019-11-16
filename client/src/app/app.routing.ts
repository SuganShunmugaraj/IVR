import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
      path: '',
      loadChildren: './../app/cuserve/cuserve.module#CuserveModule'
    },
    {
      path: 'home',
      loadChildren: './../app/cuserve/cuserve.module#CuserveModule'
    },
    {
      path: 'admin',
      loadChildren: './../app/admin/admin.module#AdminModule'
    },
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes,  { useHash: true })],
    exports: [RouterModule],
    providers: []
  })
  export class AppRouting {}
