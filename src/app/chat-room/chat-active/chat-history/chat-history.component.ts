import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Message } from 'src/app/model/message.model';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css']
})
export class ChatHistoryComponent implements OnInit, AfterViewChecked {
  
  userContactId!: number;
  messages: Message[] = [];
  currentContactId!: number;
  loading: boolean = true;

  constructor(private ms: MessageService,
              private us: UserService) {}

  ngOnInit(): void {
    this.userContactId = this.us.userDetails.contactInfo.id;
    this.subscribeForContactChanging();
    this.subscribeForSentMessages();
    this.subscribeForMessageSignals();
  }

  ngAfterViewChecked(): void {
    this.scrollMessageContainer();
  }

  subscribeForSentMessages() {
    this.ms.sentMessageSignal.subscribe(
      msg => {
        this.appendSentMessage(msg);
      }
    )
  }
  
  isSent(msg: Message) {
    return msg.source.id === this.userContactId;
  }

  subscribeForContactChanging() {
    this.ms.selectedContactsId.subscribe(
      contactId => {
        this.loading = true;
        this.currentContactId = contactId;
        this.ms.getHistoryMessages(this.userContactId, contactId).pipe(take(1)).subscribe(
          data => {
            this.messages = data;
            this.loading = false;
          }
        )
      }
    )
  }

  subscribeForMessageSignals() {
    this.ms.receivedMessageSignal.subscribe(
      (msg: Message) => {
        if (msg.source.id == this.currentContactId)
          this.appendReceivedMessage(msg);
        else
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

  appendReceivedMessage(msg: Message) {
    this.messages.push(msg);
    this.playAppendedReceivedEffect();
  }

  appendSentMessage(msg: Message) {
    this.messages.push(msg);
    this. playSentEffect();
  }

  playSentEffect() {
    let audio: any = document.querySelector('#sent-sound-effect');
    audio.volume = 0.5;
    audio?.play();
  }

  playAppendedReceivedEffect() {
    let audio: HTMLAudioElement | null = document.querySelector('#received-sound-effect-2');
    audio?.play();
  }

  playReceivedEffect() {
    let audio: HTMLAudioElement | null = document.querySelector('#received-sound-effect-1');
    audio?.play();
  }

  scrollMessageContainer() {
    const container: HTMLDivElement | null = document.querySelector('.messages-container');
    container?.scrollTo({top: container.scrollHeight})
  }
}
