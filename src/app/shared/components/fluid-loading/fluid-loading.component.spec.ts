import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluidLoadingComponent } from './fluid-loading.component';

describe('FluidLoadingComponent', () => {
  let component: FluidLoadingComponent;
  let fixture: ComponentFixture<FluidLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FluidLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FluidLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
