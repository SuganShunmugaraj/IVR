import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import {
  DropdownModule, CalendarModule, PanelModule, TabViewModule,
  CheckboxModule, FileUploadModule, InputSwitchModule, GMapModule,
  SelectButtonModule, DialogModule,
} from 'primeng/primeng';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NgxStripeModule } from 'ngx-stripe';
import { RemovewhitespacesPipe } from './pipes/removeWhiteSpaces.pipe';
import { LoaderComponent } from './loader/loader.component';
import { GeneratebillsComponent } from './generateBills/generateBills.component';
import { CreateivrComponent } from './createIvr/createIvr.component';
import { AccountComponent } from '../admin/users/account/account.component';
import { BillingComponent } from '../admin/users/billing/billing.component';
import { IvrlistComponent } from '../admin/users/ivrList/ivrList.component';
import { RouterModule, Routes } from '@angular/router';
import { PaymentsucessComponent } from './paymentSuccess/paymentSuccess.component';
import { ResetpasswordComponent } from './resetPassword/resetPassword.component';
import { EmailConfirmationComponent } from './emailConfirmation.component';
import { CalllogComponent, KeysPipe } from './callLog/callLog.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GMapModule,
    SelectButtonModule,
    GooglePlaceModule,
    NgxStripeModule.forRoot('pk_test_1gcuA4agFTW8D1qYc9rWfVbX'),
    ToastModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PanelModule,
    CalendarModule,
    DropdownModule,
    OrganizationChartModule,
    RouterModule,
    TableModule,
    FileUploadModule,
    NgxJsonViewerModule,
    ClipboardModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    PanelModule,
    TableModule,
    DropdownModule,
    FileUploadModule,
    InputSwitchModule,
    SelectButtonModule,
    CheckboxModule,
    CalendarModule,
    ConfirmDialogModule,
    EmailConfirmationComponent,
    GMapModule,
    ToastModule,
    HttpClientModule,
    GooglePlaceModule,
    TabViewModule,
    RemovewhitespacesPipe,
    LoaderComponent,
    OrganizationChartModule,
    GeneratebillsComponent,
    CreateivrComponent,
    AccountComponent,
    BillingComponent,
    IvrlistComponent,
    ResetpasswordComponent,
    DialogModule,
    PaymentsucessComponent,
    CalllogComponent,
    KeysPipe,
    NgxJsonViewerModule,
    ClipboardModule
  ],
  declarations: [
    RemovewhitespacesPipe,
    LoaderComponent,
    GeneratebillsComponent,
    CreateivrComponent,
    AccountComponent,
    BillingComponent,
    IvrlistComponent,
    PaymentsucessComponent,
    ResetpasswordComponent,
    EmailConfirmationComponent,
    CalllogComponent,
    KeysPipe
  ]
})
export class ShareModule { }
