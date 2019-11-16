import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratebillsComponent } from './generateBills.component';

describe('GeneratebillsComponent', () => {
  let component: GeneratebillsComponent;
  let fixture: ComponentFixture<GeneratebillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratebillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratebillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
