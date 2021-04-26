import { switchMap } from 'rxjs/operators';
import { PostsService } from './../shared/shared/posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from './../shared/interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$!: Observable<Post>

  constructor(
    private route: ActivatedRoute,
    private postSvc: PostsService
  ) { }

  ngOnInit(): void {
    
    this.post$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = params.get('id');
        return this.postSvc.getById(id!)
      })
    );

  }

}
