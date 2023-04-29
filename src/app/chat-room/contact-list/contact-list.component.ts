import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/model/app-user.model';
import { Contact } from 'src/app/model/Contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[] = [];
  currentContactId!: number;
  userDetails!: AppUser;
  loading = false;
  addContactVisible = false;
  addContactError = false;
  addedSuccessfully = false;

  constructor(private us: UserService,
              private cs: ContactService,
              private ms: MessageService) {}

  ngOnInit(): void {
    this.contacts = this.us.userDetails.contactList;
    this.userDetails = this.us.userDetails;
  }

  onSelectContact(contactId: number, signalEl: HTMLDivElement) {
    if (contactId != this.currentContactId) {
      this.ms.selectedContactsId.next(contactId);
      this.currentContactId = contactId;
    }
    if (!signalEl.classList.contains('disnone')) {
      signalEl.innerText = '0';
      signalEl?.classList.add('disnone')
    }
  }

  onAddContactIcon() {
    this.addContactVisible = true;
  }

  onCloseAddContactComponent() {
    this.addContactVisible = false;
  }

  onAddContact(phone: string) {
    this.loading = true;
    this.addedSuccessfully = false;
    this.addContactError = false;
    if (phone && phone.length > 0) {
      this.cs.getContactByPhone(phone, this.userDetails.id).subscribe(
        contact => {
          this.loading = false;
          if (contact) {
            this.contacts.push(contact)
            this.addedSuccessfully = true;
            this.cs.contactListSize.next(this.contacts.length)
            this.ms.selectedContactsId.next(contact.id);
          }
          else
            this.addContactError = true;

          this.addContactVisible = false;
        }
      )
    } 
    else
      this.loading = false;
  }

  onRemoveContact(contact: Contact) {
    this.cs.removeContact(this.userDetails.id, contact.id).subscribe(
      res => {
        console.log(res)
        if (res == true) {
          this.remove(contact)
          if (this.contacts[0])
            this.ms.selectedContactsId.next(this.contacts[0].id)
          else
            this.cs.contactListSize.next(this.contacts.length)
        }

      }
    )
  }

  private remove(contact: Contact) {
    for (let i = 0; i < this.contacts.length; i++) {
      if (contact.id == this.contacts[i].id)
        this.contacts.splice(i, 1);
    }
  }
}
