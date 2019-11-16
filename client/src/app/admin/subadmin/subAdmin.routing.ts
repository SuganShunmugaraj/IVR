import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubadminlandingComponent } from './subAdminLanding/subAdminLanding.component';
import { SubadminlistComponent } from './subAdminList/subAdminList.component';
import { RoleslistComponent } from './rolesList/rolesList.component';
import { AddrolesComponent } from './addRoles/addRoles.component';

const routes: Routes = [
    {
        path: '', component: SubadminlandingComponent,
        children: [
            { path: '', component: SubadminlistComponent },
            { path: 'roles', component: RoleslistComponent },
            { path: 'addroles', component: AddrolesComponent },
        ]
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})

export class SubAdminRouting { }
