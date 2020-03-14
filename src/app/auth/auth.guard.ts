import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/internal/operators';
import { AuthServise } from './auth.Service';

@Injectable()

export class AuthGaurd implements CanActivate{

  constructor(private authService :AuthServise,
              private router :Router){}

  canActivate(route: ActivatedRouteSnapshot
              , state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.pipe(
      take(1),
      map(user => {
        let isAuth = !!user;
        if(isAuth)
          return true;
        return this.router.createUrlTree(['/auth']);

      })
    )
  }

}
