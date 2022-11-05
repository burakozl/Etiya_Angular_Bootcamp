import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthLoginService } from 'src/app/services/auth-login.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  data!: User;
  errorMessage!: string;
  constructor(
    private authLoginService: AuthLoginService,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  login() {
    if(!this.loginForm.valid){
      this.toastr.error('Form alanı zorunludur', 'Sistem mesajı :');
    }else{
      const userLogin: User = {
        ...this.loginForm.value,
      };
      this.authLoginService.checkLogin(userLogin).subscribe({
        next: (res) => {
          this.data = res;
        },
        error: (err) => {
          this.errorMessage = err.message;
        },
        complete: () => {
          this.localStorageService.set('token', this.data.access_token);
          this.localStorageService.isUserLoggedIn.subscribe();
          this.localStorageService.login();
          this.router.navigateByUrl('/home');
        },
      });
    }
  }

}
