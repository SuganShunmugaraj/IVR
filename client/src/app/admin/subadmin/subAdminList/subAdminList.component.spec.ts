import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminlistComponent } from './subAdminList.component';

describe('SubadminlistComponent', () => {
  let component: SubadminlistComponent;
  let fixture: ComponentFixture<SubadminlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubadminlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubadminlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
