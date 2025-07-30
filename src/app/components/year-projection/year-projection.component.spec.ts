import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearProjectionComponent } from './year-projection.component';

describe('YearProjectionComponent', () => {
  let component: YearProjectionComponent;
  let fixture: ComponentFixture<YearProjectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearProjectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YearProjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
