import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthGuardService } from '../providers';
import { CuserveComponent } from './cuserve.component';
import { HomeComponent } from './home/home.component';
import { PaymentsucessComponent } from '../share/paymentSuccess/paymentSuccess.component';
import { ResetpasswordComponent } from '../share/resetPassword/resetPassword.component';
import { EmailConfirmationComponent } from '../share/emailConfirmation.component';

const routes: Routes = [
    {
        path: '',  component: CuserveComponent,
        children: [
            { path: '',  component: HomeComponent },
            { path: 'dashboard', canActivate: [UserAuthGuardService], loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'paymentSuccess', component: PaymentsucessComponent },
            { path: 'resetpass/:id', component: ResetpasswordComponent },
            { path: 'verify/:id', component: EmailConfirmationComponent }
        ]
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})

export class CuserveRouting { }
