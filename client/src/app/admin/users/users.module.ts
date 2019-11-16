import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRouting } from './users.routing';
import { LandingComponent } from './landing/landing.component';
import { UserlistsComponent } from './userLists/userLists.component';
import { UserlandingComponent } from './userLanding/userLanding.component';
import { ShareModule } from '../../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    UsersRouting,
    ShareModule,
  ],
  declarations: [
    LandingComponent,
    UserlistsComponent,
    UserlandingComponent,

  ]
})
export class UsersModule { }
