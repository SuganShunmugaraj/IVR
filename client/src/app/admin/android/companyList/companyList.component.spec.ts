import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanylistComponent } from './companyList.component';

describe('CompanylistComponent', () => {
  let component: CompanylistComponent;
  let fixture: ComponentFixture<CompanylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
