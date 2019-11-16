import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateivrComponent } from './createIvr.component';

describe('CreateivrComponent', () => {
  let component: CreateivrComponent;
  let fixture: ComponentFixture<CreateivrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateivrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateivrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
