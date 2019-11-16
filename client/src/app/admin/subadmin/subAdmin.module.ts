import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubadminlandingComponent } from './subAdminLanding/subAdminLanding.component';
import { SubadminlistComponent } from './subAdminList/subAdminList.component';
import { RoleslistComponent } from './rolesList/rolesList.component';
import { SubAdminRouting } from './subAdmin.routing';
import { ShareModule } from '../../share/share.module';
import { AddrolesComponent } from './addRoles/addRoles.component';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    SubAdminRouting
  ],
  declarations: [
    SubadminlandingComponent,
     SubadminlistComponent,
      RoleslistComponent,
      AddrolesComponent]
})

export class SubadminModule { }
