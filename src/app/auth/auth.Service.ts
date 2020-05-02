import { AppState } from './../store/app.reducer';
import { Store } from '@ngrx/store';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/internal/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import * as AuthActions from "./store/auth.action";
import * as AuthReducers from "./store/auth.reducer";

 
@Injectable({ providedIn: "root" })
export class AuthService {
  private _tokenExpirationTimer: any;

  constructor(private store: Store<AppState>) {}

  setLogoutTimer(expirationDuration: number) {
    this._tokenExpirationTimer = setTimeout(
      () => this.store.dispatch(new AuthActions.Logout()),
      expirationDuration
    );
  }

  clearLogoutTimer() {
    if (this._tokenExpirationTimer) {
      clearTimeout(this._tokenExpirationTimer);
      this._tokenExpirationTimer = null;
    }
  }
}