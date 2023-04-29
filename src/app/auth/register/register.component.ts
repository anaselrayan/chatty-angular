import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/app/model/register-request.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  loading = false;
  error = false;

  constructor(private as: AuthService,
              private us: UserService,
              private router: Router) {}

  ngOnInit(): void {
    this.buildRegisterForm();
  }

  buildRegisterForm() {
    this.registerForm = new FormGroup({
      'fullName': new FormControl('', [Validators.required, Validators.maxLength(100)]),
      'phone': new FormControl('', [Validators.required ,Validators.pattern('^01\\d{9}$')]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)])
    })
  }

  onSubmit() {
    this.error = false;
    this.loading = true;
    const fullName = this.registerForm.value.fullName;
    const phone = this.registerForm.value.phone;
    const password = this.registerForm.value.password;
    const registerReq = new RegisterRequest(fullName, phone, password);
    this.as.register(registerReq).subscribe(response => {
      if (response.user) {
        this.us.userDetails = response.user;
        this.router.navigate(['/chat']);
      }
    }, (error) => {
      this.error = true;
      this.loading = false;
    })
  }
}
