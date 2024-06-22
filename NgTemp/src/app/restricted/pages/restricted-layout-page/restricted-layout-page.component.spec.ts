import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictedLayoutPageComponent } from './restricted-layout-page.component';

describe('RestrictedLayoutPageComponent', () => {
  let component: RestrictedLayoutPageComponent;
  let fixture: ComponentFixture<RestrictedLayoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestrictedLayoutPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestrictedLayoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
