import { AuthService } from './../../admin/shared/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private authSvc: AuthService,
        private router: Router
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // если токен присудствует и пользователь зареган
        if (this.authSvc.IsAuthenticated()) {
            // необходимо добовлять токен для каждого запроса
            // вызывается объект реквеста и переопределяется методом клон сам объект реквеста
            req = req.clone( {
                // параметры для запроса
                setParams: {
                    // параметр который принимает firebase
                    auth: this.authSvc.token
                }
            })
        } else {
            
        }
        // вызывается функцию next и вызывается метод который возвращает стрим, куда передается реквест
        return next.handle(req)
        .pipe(
            // tap( () => {
            //     console.log('Interceptor');
            // }),
            catchError( (error: HttpErrorResponse) => {
                // оператор делает из ошибки Observable
                console.log('interseptor error: -- ', error)
                if (error.status === 401) {
                    this.authSvc.logOut();
                    this.router.navigate(['/admin', 'login'], {
                     queryParams: {
                         authFailed: true
                     }   
                    })
                }
                return throwError(error);
            })
        )
    }
}