import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthenticationResponse } from 'src/app/model/authentication-response.mode';
import { LoginRequest } from 'src/app/model/login-request.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  error = false;

  constructor(private us: UserService,
              private as: AuthService,
              private router: Router) {}

  ngOnInit(): void {
    this.buildLoginForm();
  }

  buildLoginForm() {
    this.loginForm = new FormGroup({
      'phone': new FormControl('', Validators.required),
      'password': new FormControl()
    })
  }

  onSubmitForm() {
    this.error = false; 
    this.loading = true;
    const phone = this.loginForm.value.phone;
    const password = this.loginForm.value.password;
    const loginReq = new LoginRequest(phone, password);
    this.as.lgoin(loginReq).subscribe(response => {
      if (response.user) {
        this.us.userDetails = response.user;
        this.router.navigate(['/chat']);
      }
    }, (error) => {
      this.error = true
      this.loading = false;
    })
  }
}
