import { environment } from '../../../environments/environment';
import { User } from '../../shared/interfaces/interfaces';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class AuthService {

  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) { }

  // firebaseConfig = {
  //   apiKey: "AIzaSyDJcQv8gliQZOIfd_ch517metitqiR4KvQ",
  //   authDomain: "dashboard-admin-b659a.firebaseapp.com",
  //   projectId: "dashboard-admin-b659a",
  //   storageBucket: "dashboard-admin-b659a.appspot.com",
  //   messagingSenderId: "853301552025",
  //   appId: "1:853301552025:web:e4d1a9fdcb4a4077f6a908",
  //   measurementId: "G-MZMDX3D21B"
  // };

  get token(): any {
    const date: any = localStorage.getItem('fb-token-exp');
    const expDate = new Date(date);
    if (new Date() > expDate) {
      this.logOut()
      return null
    }
    return localStorage.getItem('fb-token')
  }

  logIn(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }


  logOut() {
    this.setToken(null);
  }

  IsAuthenticated(): boolean {
    // or TRUE or FALSE
    return !!this.token;
  }




  private handleError(error: HttpErrorResponse): any {
    const {message} = error.error.error;
    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Wrong email')
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Wrong password')
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email not found')
        break;
    }
      return throwError(error);
  }


  private setToken(res: any | null) {
    // console.log(res);
    if (res) {
      const expDate = new Date( new Date().getTime() + +res.expiresIn * 1000);
      localStorage.setItem('fb-token', res.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }

}


