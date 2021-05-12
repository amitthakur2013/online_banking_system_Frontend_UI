import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBillerComponent } from './update-biller.component';

describe('UpdateBillerComponent', () => {
  let component: UpdateBillerComponent;
  let fixture: ComponentFixture<UpdateBillerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBillerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
