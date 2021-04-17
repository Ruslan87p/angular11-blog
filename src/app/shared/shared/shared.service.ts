import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  public checkError = (controlName: string, errorName: string, form: FormGroup) => {
    return form.controls[controlName].hasError(errorName);
  }
}
