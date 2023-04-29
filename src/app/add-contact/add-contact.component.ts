import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements AfterViewInit {
  @ViewChild('element') element!: ElementRef;

  @Output() closeModal = new EventEmitter();
  @Output() addContact = new EventEmitter<string>();
  @Input() placeHolder = '';
  @Input() title = '';
  
  ngAfterViewInit(): void {
    setTimeout(()=> {
      this.element.nativeElement.classList.add('translate')
    }, 100)
  }

  onClose() {
    this.closeModal.emit();
  }

  onAddContact(value: string) {
    if (value.length > 1)
      this.addContact.emit(value);
  }

}
