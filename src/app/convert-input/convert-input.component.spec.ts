import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertInputComponent } from './convert-input.component';

describe('ConvertInputComponent', () => {
  let component: ConvertInputComponent;
  let fixture: ComponentFixture<ConvertInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConvertInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
