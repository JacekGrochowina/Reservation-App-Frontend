import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageContainerTemplateComponent } from './page-container-template.component';

describe('PageContainerTemplateComponent', () => {
  let component: PageContainerTemplateComponent;
  let fixture: ComponentFixture<PageContainerTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageContainerTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageContainerTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
