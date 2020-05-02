import { Store } from '@ngrx/store';
import { PlaceHolderDirective } from './../shared/placeholder/placeholder.directive';
import { AlertComponent } from './../shared/alert/alert/alert.component';
import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthServise } from './auth.Service';
import { Router } from '@angular/router';
import { AppState } from '../store/app.reducer';
import * as AuthActions from './store/auth.action'
// import {AuthService} from "../auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  // styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  errorMessage: any;

  @ViewChild(PlaceHolderDirective, { static: false }) alertHost: PlaceHolderDirective;
  closeSubscription: any;

  constructor(private authService: AuthServise, private router: Router,
     private componentFactoryResolver: ComponentFactoryResolver,
     private store: Store<AppState>
     ) { }

  ngOnInit() {


    this.store.select('auth').subscribe(authState=>{
      this.isLoading = authState.loading;
      this.error = authState.authError
    })
    
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {

    this.isLoading = true
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    if (this.isLoginMode) {


      this.store.dispatch(new AuthActions.LoginStart({ email, password }))

      // this.store.select('auth').subscribe(authState=>{

      // })

      // this.authService.login({ email, password }).
      // .subscribe(resData => {
      //   console.log(resData);
      //   this.router.navigate(['recipes']);
      //   this.isLoading = false;
      // }, error => {
      //   this.error = error;
      //   this.showErrorAlert(error)
      //   this.isLoading = false;
      // });



    } else {
      this.authService.signup({ email, password }).subscribe(resData => {
        console.log(resData);
        this.router.navigate(['recipes']);
        this.isLoading = false;
      }, error => {
        this.error = error;
        this.showErrorAlert(error)
        this.isLoading = false;
      });
    }
    // this.authService.signInUser(form.value.email, form.value.password)


  }

  onHadleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
    componentRef.instance.message = message;
    this.closeSubscription = componentRef.instance.close.subscribe(() => {
      this.closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
    })
  }

  ngOnDestroy() {
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }

}
