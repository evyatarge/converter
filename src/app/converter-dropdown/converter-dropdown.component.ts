import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-converter-dropdown',
  imports: [],
  templateUrl: './converter-dropdown.component.html',
  styleUrl: './converter-dropdown.component.scss'
})
export class ConverterDropdownComponent {

  @Input() options: string[] = [];

  @Output() onSelectChange: EventEmitter<string> = new EventEmitter();

  public selected = '';

  // todo - fix the track by to be unique - {id: 'USD', title:'US Dollar'} => id+title
  trackByOption: any = (index: number, item: any) => `${item+index}`;

  onSelect(selectedOption: Event) {
    this.selected = (selectedOption?.target as unknown as HTMLSelectElement)?.value;
    this.onSelectChange.emit(this.selected);
  }
}
