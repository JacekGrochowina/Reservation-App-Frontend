import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsGridComponent } from './reservations-grid.component';

describe('ReservationsGridComponent', () => {
  let component: ReservationsGridComponent;
  let fixture: ComponentFixture<ReservationsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationsGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
