import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../share/share.module';
import { CuserveRouting} from './cuserve.routing';
import { CuserveComponent } from './cuserve.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
      CommonModule,
      ShareModule,
      CuserveRouting
  ],
  declarations: [
    CuserveComponent,
      HeaderComponent,
      FooterComponent,
      HomeComponent,
      SignupComponent,
  ]
})

export class CuserveModule { }
