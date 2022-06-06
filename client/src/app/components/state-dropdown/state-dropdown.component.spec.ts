import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateDropdownComponent } from './state-dropdown.component';

describe('StateDropdownComponent', () => {
  let component: StateDropdownComponent;
  let fixture: ComponentFixture<StateDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
