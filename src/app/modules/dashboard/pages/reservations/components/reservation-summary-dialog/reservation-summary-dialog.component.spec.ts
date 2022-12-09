import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationSummaryDialogComponent } from './reservation-summary-dialog.component';

describe('ReservationSummaryDialogComponent', () => {
  let component: ReservationSummaryDialogComponent;
  let fixture: ComponentFixture<ReservationSummaryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationSummaryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationSummaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
