import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConverterDropdownComponent } from './converter-dropdown.component';

describe('ConverterDropdownComponent', () => {
  let component: ConverterDropdownComponent;
  let fixture: ComponentFixture<ConverterDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConverterDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConverterDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
