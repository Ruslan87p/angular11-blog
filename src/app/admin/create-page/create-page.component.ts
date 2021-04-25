import { AlertService } from './../shared/alert.service';
import { PostsService } from './../../shared/shared/posts.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/interfaces/interfaces';
import { SharedService } from 'src/app/shared/shared/shared.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {


  public form!: FormGroup;

  constructor(private fb: FormBuilder,
              private postSvs: PostsService,
              public sharedSvc: SharedService,
              private alertSvc: AlertService) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      title: new FormControl(null, [
        Validators.required,
      ]),
      author: new FormControl(null, [
        Validators.required,
      ]),
      text: new FormControl(null, [
        Validators.required,
      ])
		});

  }
  


  onCreatePost() {

    if (this.form.invalid) {
      return;
    }

    const post: Post = {
      title: this.form.value.title,
      author: this.form.value.author,
      text: this.form.value.text,
      date: new Date()
    }

    this.postSvs.create(post)
    .subscribe( (p) => {
      console.log(p, 'this.postSvs.create');
      this.form.reset();
      this.alertSvc.success('Post was successfully created');
    })

  }

}
