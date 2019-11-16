import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  _billingcount = new BehaviorSubject<any>(0);
  billingCount$ = this._billingcount.asObservable();
  _ivrcount = new BehaviorSubject<any>(0);
  ivrcount$ = this._ivrcount.asObservable();

  constructor() { }

  setContent(data: any) {
    this._billingcount.next(data);
  }

  getData() {
    return this.billingCount$;
  }

}
