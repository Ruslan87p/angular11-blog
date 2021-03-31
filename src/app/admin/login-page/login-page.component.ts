import { AuthService } from '../shared/auth.service';
import { User } from '../../shared/interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form!: FormGroup;
  email!: FormControl;
  password!: FormControl;
  submitted = false;
  message!: string;

  matcher = new ErrorStateMatcher();


  constructor(
    public authSvc: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }


  hide = true;
  login = true;
  ngOnInit(): void {

    // подписка на параметр который передавался в гуарде
    this.route.queryParams
    .subscribe( (params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Please login';
      }
    });

    this.createFormControls();
    this.createForm();

  }

  createForm() {
    this.form = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  createFormControls() {
    this.email = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]);
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.authSvc.logIn(user)
      .subscribe( (res) => {
        this.form.reset();
        this.router.navigate(['/admin', 'dashboard']);
        this.submitted = false;
      }, error => {
        this.submitted = false;
      });
  }

}
