import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillinglistsComponent } from './billingLists.component';

describe('BillinglistsComponent', () => {
  let component: BillinglistsComponent;
  let fixture: ComponentFixture<BillinglistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillinglistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillinglistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
