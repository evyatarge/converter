import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-convert-input',
  imports: [],
  templateUrl: './convert-input.component.html',
  styleUrl: './convert-input.component.scss'
})
export class ConvertInputComponent {

  @Output() valueChanged = new EventEmitter();

  value: number = 0;

  valueChange(inputValue: any) {
    this.value = inputValue.target.value ?? '0';
    this.valueChanged.emit(this.value);
  }
}
