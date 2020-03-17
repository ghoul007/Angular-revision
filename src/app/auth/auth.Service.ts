import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/internal/operators';
import {BehaviorSubject, throwError} from 'rxjs';
import {User} from './user.model';
import {Router} from '@angular/router';

export interface AuthResponse {
  idToken	:string
  email	:string
  refreshToken	:string
  expiresIn	:string
  localId	:string
  registered ?:	boolean
}

@Injectable({ providedIn: 'root'})
export class AuthServise {

  user = new BehaviorSubject<User>(null);
  private expTimer;

  constructor(private http:HttpClient,
              private router:Router) {}

  signup(userData){
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDx7iNUi6tfwdfNFFbQhu16Ej_rgflTluE',
        {
            email: userData.email,
            password: userData.password,
            returnSecureToken:true
      }).pipe(catchError(
        this.handleError),
        tap((resData)=> {
          this.handleUser(resData.email, resData.localId,resData.expiresIn,resData.expiresIn);
        }
      ))
  }

  login(userData){

    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDx7iNUi6tfwdfNFFbQhu16Ej_rgflTluE',
      {
        email: userData.email,
        password: userData.password,
        returnSecureToken:true
      }).pipe(catchError(this.handleError),
      tap((resData)=> {
        this.handleUser(resData.email, resData.localId,resData.idToken,resData.expiresIn);
      }))
  }

  autoLogin(){
    const userData = JSON.parse(localStorage.getItem('userData'));
    if(!userData)
      return;
    const loadedUser = new User(
      userData.email,userData.id,userData._token,userData._tokenExpirationDate
    )

    if(loadedUser.token){
      this.user.next(loadedUser);

      let expDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      console.log('autologin time :',expDuration)
      this.autoLogout(expDuration)
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
    if(this.expTimer){
      clearTimeout(this.expTimer);
    }
    this.expTimer = null;
  }

  autoLogout(expDuration:number){
    this.expTimer =  setTimeout(() => {
      this.logout();
    },expDuration)
  }

  handleUser(email:string,id:string,token:string ,exp:string){
    let expDate = new Date(new Date().getTime() + +exp * 1000);

    let user = new User(
      email,id,token,expDate
    );
    this.user.next(user);
    localStorage.setItem('userData',JSON.stringify(user));
    console.log('user loginlou',+exp * 1000)
    this.autoLogout(+exp * 1000)
  }

  handleError(errorRes:HttpErrorResponse){

    let errorMessage = 'This is a Unknown Error';

    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage)
    }

    switch (errorRes.error.error.message){
      case 'EMAIL_EXISTS':
        errorMessage='This Email already Exist.'
            break;
      case 'EMAIL_NOT_FOUND':
        errorMessage='This Email is Not Found.'
            break;
      case 'INVALID_PASSWORD' :
        errorMessage='Wrong Password , PLease Try again.'
            break;
      case 'USER_DISABLED' :
        errorMessage = 'Premium Member Only';
            break;
    }
    return throwError(errorMessage);
  }
}