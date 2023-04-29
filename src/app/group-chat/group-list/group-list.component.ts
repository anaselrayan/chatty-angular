import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Contact } from 'src/app/model/Contact.model';
import { RoomDTO } from 'src/app/model/Room.dto';
import { Room } from 'src/app/model/room.model';
import { RoomService } from 'src/app/services/room.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  roomList: Room[] = [];
  userContact!: Contact;
  selectedRoomId = 0;
  addGroupVisible = false;
  listLoading = false;
  roomLoading = false;
  joinError = false;
  selectedNav = 1;
  roomAddedSuccessfully = false;


  constructor(private rs: RoomService,
    private us: UserService) { }

  ngOnInit(): void {
    this.userContact = this.us.userDetails.contactInfo;
    this.loadAllRooms();
  }

  loadAllRooms() {
    this.listLoading = true
    this.rs.getAllRooms().pipe(take(1)).subscribe(
      data => {
        this.roomList = data
        this.listLoading = false
      }
    )
  }

  onSelectRoom(room: Room) {
    this.joinError = false;
    if (this.selectedRoomId != room.id) {
      this.roomLoading = true;
      this.rs.establishConnection(room.id);
      setTimeout(()=> {
        if (this.rs.closeCode == 1000) {
          this.selectedRoomId = room.id;
          this.rs.roomListSize.next(this.roomList.length)
          this.rs.currenActiveRoom.next(room)
        } else {
          console.log('rejected')
          this.joinError = true
        }
        this. roomLoading = false;
      }, 500)
    }
  }

  onAddGroup(groupName: string) {
    const room = new RoomDTO(groupName, this.userContact);
    this.listLoading = true;
    this.rs.addRoom(room).pipe(take(1)).subscribe(
      data => {
        if (data) {
          this.roomList.push(data);
          this.roomAddedSuccessfully = true;
          this.selectedRoomId = data.id
          this.rs.currenActiveRoom.next(data)
        }
      }
    )
    this.addGroupVisible = false;
    this.listLoading = false;
  }

  onCloseAddGroupModal() {
    this.addGroupVisible = false;
  }

  onAddGroupIconClicked() {
    this.roomAddedSuccessfully = false;
    this.addGroupVisible = true;
  }

  onFilterMyRooms() {
    if (this.selectedNav != 2) {
      this.listLoading = true;
      this.rs.getMyRooms().pipe(take(1)).subscribe(
        data => {
          this.roomList = data
          this.listLoading = false
        }
      )
      this.selectedNav = 2;
    }
  }

  onFilterGlobalRooms() {
    if (this.selectedNav != 3) {
      this.listLoading = true
      this.rs.getGlobalRooms().pipe(take(1)).subscribe(
        data => {
          this.roomList = data
          this.listLoading = false
        }
      )
      this.selectedNav = 3;
    }
  }

  onFilterAllRooms() {
    if (this.selectedNav != 1) {
      this.loadAllRooms();
      this.selectedNav = 1;
    }
  }

  onLockRoom(roomId: number) {
    this.rs.lockRoom(roomId).pipe(take(1)).subscribe(
      res => {
        document.querySelector('#unlock-room-' + roomId)?.classList.toggle('disnone')
        document.querySelector('#lock-room-' + roomId)?.classList.toggle('disnone')
      }
    )
  }

  onUnlockRoom(roomId: number) {
    this.rs.unlockRoom(roomId).pipe(take(1)).subscribe(
      res => {
        document.querySelector('#unlock-room-' + roomId)?.classList.toggle('disnone')
        document.querySelector('#lock-room-' + roomId)?.classList.toggle('disnone')
      }
    )
  }

  onDeleteRoom(roomId: number, listIdex: number) {
    this.rs.deleteRoom(roomId).subscribe(
      res => {
        if (res) {
          this.roomList.splice(listIdex, 1);
          this.notifyChanges();
        }
      }
    )
  }

  notifyChanges() {
    if (this.roomList.length > 0) {
      this.rs.currenActiveRoom.next(this.roomList[0]);
    }
    this.rs.roomListSize.next(this.roomList.length)
  }

  getLightColor(color: string, offset: number) {
    color = color.split('(')[1];
    color = color.split(')')[0];
    let rgb = color.split(',');
    const r = Number.parseInt(rgb[0]) * offset;
    const g = Number.parseInt(rgb[1]) * offset;
    const b = Number.parseInt(rgb[2]) * offset;

    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }
}
