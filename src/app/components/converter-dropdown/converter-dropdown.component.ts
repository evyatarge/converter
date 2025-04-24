import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-converter-dropdown',
  templateUrl: './converter-dropdown.component.html',
  styleUrl: './converter-dropdown.component.scss',
  imports: [
    NgForOf
  ],
})
export class ConverterDropdownComponent {

  @Input() options: string[] | null = [];
  @Input() title: string = '';

  @Output() onSelectChange: EventEmitter<string> = new EventEmitter();

  public selected = '';

  trackBy: any = (index: number, option: any) => this.title+index;

  onSelect(selectedOption: Event) {
    this.selected = (selectedOption?.target as unknown as HTMLSelectElement)?.value;
    this.onSelectChange.emit(this.selected);
  }
}
