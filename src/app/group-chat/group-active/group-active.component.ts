import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { RoomMessage } from 'src/app/model/room-message.model';
import { UserService } from 'src/app/services/user.service';
import { RoomService } from 'src/app/services/room.service';
import { Room } from 'src/app/model/room.model';

@Component({
  selector: 'app-group-active',
  templateUrl: './group-active.component.html',
  styleUrls: ['./group-active.component.css']
})
export class GroupActiveComponent implements OnInit, AfterViewChecked {
  messages: RoomMessage[] = [];
  activeRoom: Room = new Room();
  activeRoomId = 0;
  roomListSize = 0;

  constructor(private us: UserService,
              private rs: RoomService) {}

  ngOnInit(): void {
    this.subscribeForActiveRoom()
    this.listenForMessages()
    this.subscribeForRoomListSize()
  }

  ngAfterViewChecked(): void {
    this.scrollMessageContainer();
  }

  subscribeForActiveRoom() {
    this.rs.currenActiveRoom.subscribe(
      next => {
        this.activeRoom = next;
        this.activeRoomId = next.id
        this.messages = [];
      }
    )
  }

  subscribeForRoomListSize() {
    this.rs.roomListSize.subscribe(
      next => this.roomListSize = next
    )
  }

  listenForMessages() {
    this.rs.receivedMessageSignal.subscribe(
      msg => {
        this.appendReceivedMessage(msg);
      }
    )
  }

  onSendMessage(input: HTMLTextAreaElement) {
    if (input.value.length > 0) {
      const src = this.us.userDetails.contactInfo;
      const msg = new RoomMessage(input.value, src, 1)
      this.rs.sendMessage(msg);
      this.appendSentMessage(msg);
      input.value = '';
    }
  }

  appendSentMessage(msg: RoomMessage) {
    msg.type = -1;
    const lastMsg = this.messages[this.messages.length - 1];
    if (lastMsg && msg.source.id == lastMsg.source.id)
      msg.imageVisible = false;
    this.messages.push(msg)
    this.playSentEffect();
  }

  appendReceivedMessage(msg: RoomMessage) {
    const lastMsg = this.messages[this.messages.length - 1];
    if (lastMsg && msg.source.id == lastMsg.source.id)
      msg.imageVisible = false;

    this.messages.push(msg)
    this.playReceivedEffect();
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
    const container: HTMLDivElement | null = document.querySelector('.group-messages-container');
    container?.scrollTo({top: container.scrollHeight})
  }

  getLightColor(color: string, offset: number) {
    color = color.split('(')[1];
    color = color.split(')')[0];
    let rgb = color.split(',');
    const r = Number.parseInt(rgb[0]) * offset;
    const g = Number.parseInt(rgb[1]) * offset;
    const b = Number.parseInt(rgb[2]) * offset;

    return 'rgb(' + r + ',' + g + ',' + b +')';
  }
}
