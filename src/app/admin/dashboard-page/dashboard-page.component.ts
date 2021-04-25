import { AlertService } from './../shared/alert.service';
import { PostsService } from './../../shared/shared/posts.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/interfaces/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  sub!: Subscription;
  deleteSub!: Subscription;
  search = '';

  constructor(
    private postSvs: PostsService,
    private alertSvc: AlertService
  ) { }

  
  ngOnInit(): void {
   
    this.sub = this.postSvs.getAll()
    .subscribe( (posts) => {
      this.posts = posts;
    })
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.deleteSub) {
      this.deleteSub.unsubscribe();
    }
  }

  remove(id: string) {
    this.deleteSub = this.postSvs.remove(id)
    .subscribe( () => {
      this.posts = this.posts.filter( (post) => post.id !== id)
      this.alertSvc.danger('Post was successfully deleted');
    });
  }

}
