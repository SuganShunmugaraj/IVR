import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminlandingComponent } from './subAdminLanding.component';

describe('SubadminlandingComponent', () => {
  let component: SubadminlandingComponent;
  let fixture: ComponentFixture<SubadminlandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubadminlandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubadminlandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
