import { Component } from '@angular/core';

@Component({
  selector: 'app-addroles',
  templateUrl: './addroles.component.html',
  styleUrls: ['./addroles.component.scss']
})
export class AddrolesComponent  {
  roles: any = {};
  addPrivilage: any;
  constructor() { }
}
