import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedDetailsInfoComponent } from './car-details-info.component';

describe('BreedDetailsInfoComponent', () => {
  let component: BreedDetailsInfoComponent;
  let fixture: ComponentFixture<BreedDetailsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreedDetailsInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreedDetailsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
