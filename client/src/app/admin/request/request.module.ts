import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestlistComponent } from './requestList/requestList.component';
import { RequestdetailComponent } from './requestDetail/requestDetail.component';
import { RequestlandingComponent } from './requestLanding/requestLanding.component';
import { ShareModule } from '../../share/share.module';
import { RequestRouting } from './request.routing';

@NgModule({
  imports: [
    ShareModule,
    CommonModule,
    RequestRouting
  ],
  declarations: [
    RequestlistComponent,
     RequestdetailComponent,
      RequestlandingComponent]
})

export class RequestModule { }
