import { Post } from './../shared/interfaces/interfaces';
import { Observable } from 'rxjs';
import { PostsService } from './../shared/shared/posts.service';
import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  posts$!: Observable<Post[]>

  constructor(private postSvs: PostsService) { }


  ngOnInit(): void {
    this.posts$ = this.postSvs.getAll();
  }

}
