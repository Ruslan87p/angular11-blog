import { map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { FbCreateResponse, Post } from './../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PostsService {

  constructor(private http: HttpClient) { }

  create(post: Post): Observable<Post> {
    return this.http.post(`${environment.fbDBUrl}/posts.json`, post)
      .pipe(map( (response: any) => {
          return {
            ...post,
            id: response.name,
            date: new Date(post.date)
          };
      }))
  }

  getAll(): Observable<Post[]> {
    return this.http.get(`${environment.fbDBUrl}/posts.json`)
    .pipe(map( (response: {[key: string]: any}) => {
      // парсим
      return Object.keys(response)
      .map( key => ({
        ...response[key],
        id: key,
        date: new Date(response[key].date)
      }))
    }) )
  }


  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.fbDBUrl}/posts/${id}.json`)
        .pipe(map( (post: Post) => {
        return {
          ...post,
          date: new Date(post.date)
        };
    }))
  }



  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDBUrl}/posts/${id}.json`)
  }

  update(post: Post): Observable<Post> {
    return this.http.patch<Post>(`${environment.fbDBUrl}/posts/${post.id}.json`, post)
  }

}
