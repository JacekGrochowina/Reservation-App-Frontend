import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsTableComponent } from './groups-table.component';

describe('CarsTableComponent', () => {
  let component: GroupsTableComponent;
  let fixture: ComponentFixture<GroupsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
