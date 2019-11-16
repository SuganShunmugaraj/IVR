import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestlandingComponent } from './requestLanding.component';

describe('RequestlandingComponent', () => {
  let component: RequestlandingComponent;
  let fixture: ComponentFixture<RequestlandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestlandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestlandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
