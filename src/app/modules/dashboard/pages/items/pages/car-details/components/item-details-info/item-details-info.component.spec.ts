import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailsInfoComponent } from './item-details-info.component';

describe('ItemDetailsInfoComponent', () => {
  let component: ItemDetailsInfoComponent;
  let fixture: ComponentFixture<ItemDetailsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDetailsInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
