import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private us: UserService, private router: Router) {

  }

  ngOnInit(): void {
    if (!this.us.userDetails)
      this.router.navigate(['/login']);
  }
  
}
