import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-toast-message',
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.css']
})
export class ToastMessageComponent implements AfterViewInit, OnInit {
  @ViewChild('element') element!: ElementRef;
  @ViewChild('sound') sound!: ElementRef;

  @Input() type: string = 'error';
  @Input() title!: string;
  @Input() content!: string;
  iconPath!: string;
  soundPath!: string;

  ngOnInit() {
    this.iconPath = 'assets/icons/' + this.type + '-icon.png';
    this.soundPath = 'assets/audio/' + this.type + '.mp3'
  }

  ngAfterViewInit(): void {
    setTimeout(()=> {
      this.element.nativeElement.classList.add('translate')
      if (this.type == 'error')
        this.sound.nativeElement.volume = 0.4;
      this.sound.nativeElement.play();
    }, 100)

    setTimeout(()=> {
      this.element.nativeElement.classList.add('disappear')
    },3000)
  }


}
