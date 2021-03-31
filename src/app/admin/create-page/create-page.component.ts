import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  form!: FormGroup;
  title!: any;
  author!: any;
  text!: any;


  constructor() { }

  ngOnInit(): void {

    this.createForm();
    this.createFormControls();

  }

  createForm() {
    this.form = new FormGroup({
      title: this.title,
      text: this.text,
      author: this.author,
    });
  }

  createFormControls() {
    this.title = new FormControl(null, [
      Validators.required,
    ]);
    this.author = new FormControl(null, [
      Validators.required,
    ]);
    this.text = new FormControl(null, [
      Validators.required,
    ]);
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const post: Post = {
      title: this.title,
      author: this.author,
      text: this.text,
      date: new Date()
    }
  }

}
