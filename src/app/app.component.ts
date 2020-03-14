import { Component, OnInit } from '@angular/core';
import { AuthServise } from './auth/auth.Service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthServise){}
  ngOnInit() {
    this.authService.autoLogin();
  }
}
