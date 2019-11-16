import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../share/share.module';
import { AdminRouting } from './admin.routing';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { BreadcrumComponent } from './core/breadcrum/breadcrum.component';
export let options: Partial<any> | (() => Partial<any>);

@NgModule({
    imports: [
        CommonModule,
        ShareModule,
        AdminRouting
    ],
    declarations: [
        AdminComponent,
        HeaderComponent,
        FooterComponent,
        LoginComponent,
        BreadcrumComponent
    ]
})

export class AdminModule { }
