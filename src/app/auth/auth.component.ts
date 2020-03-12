import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthServise } from './auth.Service';
import { Router } from '@angular/router';
// import {AuthService} from "../auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  // styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  errorMessage: any;
  constructor(private authService: AuthServise, private router: Router) { }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {

    this.isLoading =  true
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    if (this.isLoginMode) {
       this.authService.login(email, password).subscribe(resData => {
        console.log(resData);
        this.router.navigate(['home']);
        this.isLoading = false;
      }, error => {
        this.error = error;
        this.isLoading = false;
      });
    } else {
      this.authService.signup(email, password).subscribe(resData => {
        console.log(resData);
        this.router.navigate(['home']);
        this.isLoading = false;
      }, error => {
        this.error = error;
        this.isLoading = false;
      });
    }
    // this.authService.signInUser(form.value.email, form.value.password)


  }
}
