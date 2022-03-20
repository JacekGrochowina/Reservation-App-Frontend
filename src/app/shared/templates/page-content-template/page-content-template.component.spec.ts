import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageContentTemplateComponent } from './page-content-template.component';

describe('PageContentTemplateComponent', () => {
  let component: PageContentTemplateComponent;
  let fixture: ComponentFixture<PageContentTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageContentTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageContentTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
