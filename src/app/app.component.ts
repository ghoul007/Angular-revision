import { LoggingService } from './logging.service';
import { Component, OnInit } from '@angular/core';
import { AuthServise } from './auth/auth.Service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthServise, private loggingService: LoggingService) { }
  ngOnInit() {
    this.authService.autoLogin();
    this.loggingService.printLog('heelo from appcompoenent');
  }
}
