import { Component } from '@angular/core';
import { Contact } from '../model/Contact.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-option-menu',
  templateUrl: './option-menu.component.html',
  styleUrls: ['./option-menu.component.css']
})
export class OptionMenuComponent {
  userDetails!: Contact;

  constructor(private us: UserService) {
    this.userDetails = this.us.userDetails.contactInfo;
  }



}
