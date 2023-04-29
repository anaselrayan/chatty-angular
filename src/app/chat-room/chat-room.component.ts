import { Component, OnInit } from '@angular/core';
import { Contact } from '../model/Contact.model';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {

  userDetails!: Contact;
  constructor(private ms: MessageService) {}
  
  ngOnInit(): void {
    this.ms.establishSocketConnection();
  }
}
