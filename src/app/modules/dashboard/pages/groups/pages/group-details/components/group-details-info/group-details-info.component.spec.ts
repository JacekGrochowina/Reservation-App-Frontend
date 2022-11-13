import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDetailsInfoComponent } from './group-details-info.component';

describe('GroupDetailsInfoComponent', () => {
  let component: GroupDetailsInfoComponent;
  let fixture: ComponentFixture<GroupDetailsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupDetailsInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupDetailsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
