import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvrlistComponent } from './ivrlist.component';

describe('IvrlistComponent', () => {
  let component: IvrlistComponent;
  let fixture: ComponentFixture<IvrlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvrlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvrlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
