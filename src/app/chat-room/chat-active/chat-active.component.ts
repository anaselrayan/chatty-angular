import { Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { Contact } from 'src/app/model/Contact.model';
import { MessageDTO } from 'src/app/model/message.dto';
import { Message } from 'src/app/model/message.model';
import { ContactService } from 'src/app/services/contact.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-active',
  templateUrl: './chat-active.component.html',
  styleUrls: ['./chat-active.component.css']
})
export class ChatActiveComponent implements OnInit {
  
  currentContact: Contact = {
    id: 0,
    name: '',
    phone: '',
    imageUrl: ''
  };
  userContactInfo!: Contact;
  contactSize!: number;

  constructor(private ms: MessageService,
              private cs: ContactService,
              private us: UserService) {}

  ngOnInit(): void {
    this.userContactInfo = this.us.userDetails.contactInfo;
    this.subscribeForContactId();
    this.subscribeForMessageSignals();
    this.subscribeForContactSize();
  }

  subscribeForContactSize() {
    this.cs.contactListSize.subscribe(
      next => this.contactSize = next
    )
  }

  subscribeForContactId() {
    this.ms.selectedContactsId.subscribe(
      contactId => {
        this.cs.getContactById(contactId).pipe(take(1)).subscribe(
          newContact => this.currentContact = newContact
        )
      }
    )
  }

  subscribeForMessageSignals() {
    this.ms.receivedMessageSignal.subscribe(
      (msg: Message) => {
        if (!this.currentContact.id)
          this.displayMessageSignal(msg);
      }
    )
  }

  displayMessageSignal(msg: Message) {
    const signalEl: HTMLDivElement | null = document.querySelector(`#message-signal-${msg.source.id}`);
    const lastMsgEl: any = signalEl?.previousSibling;
    let count: any = signalEl?.innerText;
    signalEl!.innerText = Number.parseInt(count) + 1 + '';
    signalEl?.classList.remove('disnone')
    lastMsgEl.innerText = msg.content;
    this.playReceivedEffect();
  }

  playReceivedEffect() {
    let audio: HTMLAudioElement | null = document.querySelector('#received-sound-effect-1');
    audio?.play();
  }

  sendMessage(msgInput: HTMLTextAreaElement) {
    let content = msgInput.value;
    if (content.length > 0) {
      let msg = new Message(content, this.userContactInfo, this.currentContact);
      this.ms.sentMessageSignal.next(msg);
      this.ms.sendMessage(msg);
      msgInput.value = '';
    }
  }

  onTypingMessage(e: KeyboardEvent, msgInput: HTMLTextAreaElement) {
    if(e.key == 'Enter') {
      this.sendMessage(msgInput);
    }
  }
}
