import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleslistComponent } from './rolesList.component';

describe('RoleslistComponent', () => {
  let component: RoleslistComponent;
  let fixture: ComponentFixture<RoleslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
