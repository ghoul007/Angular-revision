import { AuthService } from './../auth.Service';
import { User } from './../user.model';
import { tap } from 'rxjs/internal/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Actions, ofType, Effect } from '@ngrx/effects'
import * as AuthActions from './auth.action'
import { switchMap, catchError, map } from 'rxjs/operators'
import { AuthResponse } from '../auth.Service';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

const USERDATA_KEY = "userData";

const handlerAuth = (resData) => {
    let expDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
    const user = new User(resData.email, resData.userId, resData.token, expDate);
    localStorage.setItem(USERDATA_KEY, JSON.stringify(user));
    return new AuthActions.AuthentificateSuccess({
        email: resData.email,
        userId: resData.localId,
        token: resData.idToken,
        expirationDate: expDate
    })
}

const handleError = (errorRes: HttpErrorResponse) => {
    let errorMsg = "An unknown error occurred!";
    if (!errorRes.error || !errorRes.error.error) {
        return of(new AuthActions.AuthentificateFailure(errorMsg));
    }
    switch (errorRes.error.error.message) {
        case "EMAIL_NOT_FOUND":
            errorMsg =
                "The user account has not been registered. The user may have been deleted.";
            break;
        case "INVALID_PASSWORD":
            errorMsg =
                "The password is invalid or the user does not have a password.";
            break;
        case "USER_DISABLED":
            errorMsg = "The user account has been disabled by an administrator.";
            break;
        case "EMAIL_EXISTS":
            errorMsg = "This email is already in use.";
            break;
        case "OPERATION_NOT_ALLOWED":
            errorMsg = "This service is not avaliable.";
            break;
        case "TOO_MANY_ATTEMPTS_TRY_LATER":
            errorMsg =
                "Too many requests have been sent from this device, try again later.";
            break;
    }
    return of(new AuthActions.AuthentificateFailure(errorMsg));
};


@Injectable()
export class AuthEffects {


    @Effect()
    authSignup$ = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupatAction: AuthActions.SignupStart) => {


            return this.http.
                post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
                    environment.firebaseAPIKey,
                    {
                        email: signupatAction.payload.email,
                        password: signupatAction.payload.password,
                        returnSecureToken: true
                    }).pipe(
                        map(resData => {
                            return handlerAuth(resData)
                        }),
                        catchError(err => {
                            return handleError(err);
                        }),

                    )


        })
    )

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {


            return this.http.
                post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
                    environment.firebaseAPIKey,
                    {
                        email: authData.payload.email,
                        password: authData.payload.password,
                        returnSecureToken: true
                    }).pipe(
                        map(resData => {
                            handlerAuth(resData);
                        }),
                        catchError(err => {
                            return handleError(err);
                        }),

                    )


        }),
    )

    @Effect({ dispatch: false })
    authRedirect = this.actions$.pipe(ofType(AuthActions.AUTHENTICATE_SUCCESS), tap(
        () => {
            // this.router.navigate(['/auth']);
            this.router.navigate(['/'])
        }
    ))



    @Effect()
    autoLogin = this.actions$.pipe(ofType(AuthActions.AUTO_LOGIN), map(
        () => {
            const userData: {
                email: string;
                id: string;
                _token: string;
                _tokenExpirationDate: string;
            } = JSON.parse(localStorage.getItem(USERDATA_KEY));
            if (!userData) return { type: "DUMMYACTION" };
            const loadedUser = new User(
                userData.email,
                userData.id,
                userData._token,
                new Date(userData._tokenExpirationDate)
            );
            if (loadedUser.token) {
                const expirationDuration =
                    new Date(userData._tokenExpirationDate).getTime() -
                    new Date().getTime();
                this.authService.setLogoutTimer(expirationDuration);
                return new AuthActions.AuthentificateSuccess({
                    email: loadedUser.email,
                    userId: loadedUser.id,
                    token: loadedUser.token,
                    expirationDate: new Date(userData._tokenExpirationDate),
                });
            }

        }
    ))



    @Effect({ dispatch: false })
    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
              this.authService.clearLogoutTimer();
            localStorage.removeItem(USERDATA_KEY);
            this.router.navigate(["/auth"]);
        })
    );


    constructor(private actions$: Actions, private http: HttpClient, private router: Router, private authService: AuthService) {

    }
}




