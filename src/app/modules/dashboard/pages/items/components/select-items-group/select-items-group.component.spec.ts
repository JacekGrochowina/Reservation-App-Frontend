import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectItemsGroupComponent } from './select-items-group.component';

describe('SelectItemsGroupComponent', () => {
  let component: SelectItemsGroupComponent;
  let fixture: ComponentFixture<SelectItemsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectItemsGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectItemsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
