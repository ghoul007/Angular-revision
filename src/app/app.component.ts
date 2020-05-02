import { Store } from '@ngrx/store';
import { LoggingService } from './logging.service';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from './auth/auth.Service';
import { isPlatformBrowser } from '@angular/common';
import { AppState } from './store/app.reducer';
import *  as AuthActions from './auth/store/auth.action'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
    private authService: AuthService, 
    private loggingService: LoggingService,
  @Inject(PLATFORM_ID) private platFormId
    ) { }
  ngOnInit() {

    if(isPlatformBrowser(this.platFormId)){
      this.store.dispatch(new AuthActions.AutoLogin());
      // this.authService.autoLogin();
    }
    this.loggingService.printLog('heelo from appcompoenent');
  }
}
