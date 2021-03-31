import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable(
  // не нужно инжектировать root потому что сервис будет использоваться только в админском модуле, нет необходимости загружить его в апп-модуль
  // {providedIn: 'root'}
  )

  // необходимо имплементировать CanActivate
export class AuthGuardService implements CanActivate {

  constructor(
    private authSvc: AuthService,
    private router: Router
  ) { }



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ):  Observable<boolean> | Promise<boolean> | boolean {

      if (this.authSvc.IsAuthenticated()) {
        return true;
      } else {
        this.authSvc.logOut();
        this.router.navigate(['/admin', 'login'], {
          // параметры, где сообщается что сессия истекла или нужео снова залогиниться
          queryParams: {
            loginAgain: true
          }
        });
      }
      return true;
  }

}
