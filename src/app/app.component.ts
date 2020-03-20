import { LoggingService } from './logging.service';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { AuthServise } from './auth/auth.Service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthServise, 
    private loggingService: LoggingService,
  @Inject(PLATFORM_ID) private platFormId
    ) { }
  ngOnInit() {

    if(isPlatformBrowser(this.platFormId)){
      this.authService.autoLogin();
    }
    this.loggingService.printLog('heelo from appcompoenent');
  }
}
