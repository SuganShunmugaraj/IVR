import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { BillinglistsComponent } from './billingLists/billingLists.component';
import { BillingdetailComponent } from './billingDetail/billingDetail.component';

const routes: Routes = [
    {
        path: '', component: LandingComponent,
        children: [
            { path: 'list', component: BillinglistsComponent },
            { path: '', component: BillinglistsComponent },
            { path: 'detail/:id', component: BillingdetailComponent },
        ]
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})

export class BillingRouting { }
