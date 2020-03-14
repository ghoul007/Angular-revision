import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { User } from './user.model';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}


@Injectable({ providedIn: 'root' })
export class AuthServise {
  user = new Subject<User>();
  constructor(private http: HttpClient, private router: Router) {

  }
  signup(email1: string, password1: string) {
    return this.http.post<AuthResponseData>(
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDx7iNUi6tfwdfNFFbQhu16Ej_rgflTluE',
      {
        email: email1,
        password: password1,
        returnSecureToken: true
      }
    )
      .pipe(catchError(this.handleError1), tap(resData => {
        const expDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
        const user = new User(resData.email, resData.localId, resData.idToken, expDate);
        this.user.next(user);
        localStorage.setItem("userData", JSON.stringify(user));
      }));
  }

  login(email1: string, password1: string) {
    return this.http.post<AuthResponseData>(
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDx7iNUi6tfwdfNFFbQhu16Ej_rgflTluE',
      {
        email: email1,
        password: password1,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError1), tap(resData => {
      const expDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
      const user = new User(resData.email, resData.localId, resData.idToken, expDate);
      this.user.next(user);
      localStorage.setItem("userData", JSON.stringify(user));
    }));
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData)
      return;
    const loadedUser = new User(
      userData.email, userData.id, userData._token, userData._tokenExpirationDate
    )

    if (loadedUser.token) {
      this.user.next(loadedUser);

      let expDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      console.log('autologin time :', expDuration)
      // this.autoLogout(expDuration)
    }
  }



  logout() {
    this.user.next(null);
    this.router.navigate(['auth'])
    localStorage.removeItem('userData')
  }



  private handleError1(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email is already registered!';
      // tslint:disable-next-line: no-switch-case-fall-through
    }
    return throwError(errorMessage);
  }

}
