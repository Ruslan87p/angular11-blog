import { AlertService } from './../shared/alert.service';
import { SharedService } from './../../shared/shared/shared.service';
import { Post } from './../../shared/interfaces/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from './../../shared/shared/posts.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  post!: Post;
  sub!: Subscription;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private postsSvc: PostsService,
    public sharedSvc: SharedService,
    private alertSvc: AlertService
  ) { }

  ngOnInit(): void {
    // не нужно отписываться от раутов, ангуляр это делает сам
    this.route.params
    .pipe(
      switchMap( (params: Params) => {
        return this.postsSvc.getById(params['id']);
      })
    )
    .subscribe( (post: Post) => {

      this.post = post;
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required),
        author: new FormControl(post.author, Validators.required),
        date: new FormControl(post.date, Validators.required),
      })

    })
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    this.sub = this.postsSvc.update( {
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title,
      author: this.form.value.author,
    }).subscribe( () => {
      this.submitted = false;
      this.alertSvc.warning('Post was successfully updated');
    })
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onUpdatePost() {
    
  }

}
