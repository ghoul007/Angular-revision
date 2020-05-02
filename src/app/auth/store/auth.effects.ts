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


const handleError = (errorRes: HttpErrorResponse) => {
    let errorMsg = "An unknown error occurred!";
    if (!errorRes.error || !errorRes.error.error) {
        return of(new AuthActions.LoginFail({ errorMsg }));
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
    return of(new AuthActions.LoginFail({ errorMsg }));
};


@Injectable()
export class AuthEffects {

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
                            let expDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
                            return new AuthActions.Login({
                                email: resData.email,
                                userId: resData.localId,
                                token: resData.idToken,
                                expirationDate: expDate
                            })
                        }),
                        catchError(err => {
                            return handleError(err);
                        }),

                    )


        }),
    )

    @Effect({ dispatch: false })
    authSuccess = this.actions$.pipe(ofType(AuthActions.LOGIN), tap(
        () => {
            this.router.navigate(['/'])
        }
    ))




    constructor(private actions$: Actions, private http: HttpClient, private router: Router) {

    }
}




