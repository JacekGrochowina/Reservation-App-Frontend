import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationPaidDialogComponent } from './reservation-paid-dialog.component';

describe('ReservationPaidDialogComponent', () => {
  let component: ReservationPaidDialogComponent;
  let fixture: ComponentFixture<ReservationPaidDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationPaidDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationPaidDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
