import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './dashboard/dashboard.component';
import { UserAccountComponent } from './account/account.component';
import { UserBillingComponent } from './billing/billing.component';
import { UserIvrComponent } from './ivr/ivr.component';
import { UserLandingComponent } from './landing/landing.component';
import { CreateivrComponent } from '../../share/createIvr/createIvr.component';
import { CalllogComponent } from '../../share/callLog/callLog.component';

const routes: Routes = [
    {
        path: '', component: UserLandingComponent,
        children: [
            { path: '', component: UserDashboardComponent },
            { path: 'account/:userid', component: UserAccountComponent },
            { path: 'billing/:userid', component: UserBillingComponent },
            { path: 'ivr/:userid', component: UserIvrComponent },
            { path: 'editivr/:id/:userid', component: CreateivrComponent},
            { path: 'createivr/:userid', component: CreateivrComponent},
            { path: 'landing', component: UserDashboardComponent },
            { path: 'calllog/:id', component: CalllogComponent }
        ]
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})

export class DashboardRouting { }
