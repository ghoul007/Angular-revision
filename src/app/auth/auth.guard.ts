import { Store } from '@ngrx/store';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/internal/operators';
import { AuthService } from './auth.Service';
import { AppState } from '../store/app.reducer';

@Injectable()

export class AuthGaurd implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router,
    private store: Store<AppState>) { }

  canActivate(route: ActivatedRouteSnapshot
    , state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select('auth').pipe(
      take(1),
      map(({ user }) => {
        let isAuth = !!user;
        if (isAuth)
          return true;
        return this.router.createUrlTree(['/auth']);

      })
    )
  }

}
