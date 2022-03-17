import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableErrorComponent } from './table-error.component';

describe('TableErrorComponent', () => {
  let component: TableErrorComponent;
  let fixture: ComponentFixture<TableErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
