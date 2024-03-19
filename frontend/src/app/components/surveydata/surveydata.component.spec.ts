import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveydataComponent } from './surveydata.component';

describe('SurveydataComponent', () => {
  let component: SurveydataComponent;
  let fixture: ComponentFixture<SurveydataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveydataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveydataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
