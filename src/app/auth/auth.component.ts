import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
// import {AuthService} from "../auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  // styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  // constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    // this.authService.signInUser(form.value.email, form.value.password)


  }
}
