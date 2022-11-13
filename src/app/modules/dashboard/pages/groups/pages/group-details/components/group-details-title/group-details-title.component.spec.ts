import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedDetailsTitleComponent } from './group-details-title.component';

describe('BreedDetailsTitleComponent', () => {
  let component: BreedDetailsTitleComponent;
  let fixture: ComponentFixture<BreedDetailsTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreedDetailsTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreedDetailsTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
