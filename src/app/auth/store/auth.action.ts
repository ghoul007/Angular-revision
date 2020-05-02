import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATE_SUCCESS = "[Auth] Authenticate Success";
export const AUTHENTICATE_FAILURE = "[Auth] Authenticate Failure";
export const LOGOUT = '[Auth] LOGOUT';
export const SIGNUP_START = '[Auth] Signup start';
export const SIGNUP = '[Auth] Signup';
export const CLEAR_ERROR = "[Auth] Clear Error";
export const AUTO_LOGIN = "[Auth] Auto Login";
export const AUTO_LOGOUT = "[Auth] Auto Logout";

export class AuthentificateSuccess implements Action {
    readonly type = AUTHENTICATE_SUCCESS;
    constructor(public payload: {
        email: string,
        userId: string,
        token: string,
        expirationDate: Date,
    }) {

    }
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload: { email: string, password: string }) { }
}

export class AuthentificateFailure implements Action {
    readonly type = AUTHENTICATE_FAILURE;
    constructor(public payload: string) { }
}



export class SignupStart implements Action {
    readonly type = SIGNUP_START;
    constructor(public payload: { email: string, password: string }) { }
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}


export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

export class AutoLogout implements Action {
    readonly type = AUTO_LOGOUT;
}

export type AuthActions = AuthentificateSuccess | Logout | LoginStart | AuthentificateFailure | SignupStart | ClearError | AutoLogin
    | AutoLogout;