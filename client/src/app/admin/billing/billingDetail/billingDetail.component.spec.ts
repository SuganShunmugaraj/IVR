import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingdetailComponent } from './billingDetail.component';

describe('BillingdetailComponent', () => {
  let component: BillingdetailComponent;
  let fixture: ComponentFixture<BillingdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
