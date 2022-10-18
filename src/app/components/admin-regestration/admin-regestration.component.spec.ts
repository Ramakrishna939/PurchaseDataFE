import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegestrationComponent } from './admin-regestration.component';

describe('AdminRegestrationComponent', () => {
  let component: AdminRegestrationComponent;
  let fixture: ComponentFixture<AdminRegestrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRegestrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRegestrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
