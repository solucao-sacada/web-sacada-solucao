import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuStepComponent } from './menu-step.component';

describe('MenuStepComponent', () => {
  let component: MenuStepComponent;
  let fixture: ComponentFixture<MenuStepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuStepComponent]
    });
    fixture = TestBed.createComponent(MenuStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
