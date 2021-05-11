import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBillerComponent } from './manage-biller.component';

describe('ManageBillerComponent', () => {
  let component: ManageBillerComponent;
  let fixture: ComponentFixture<ManageBillerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBillerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
