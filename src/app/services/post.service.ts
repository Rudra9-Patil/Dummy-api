import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PostResponse } from '../models/posts';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl =  'https://dummyapi.io/data/v1/';
  constructor(private http:HttpClient) { }

  getusers(){
    return this.http.get(this.baseUrl + 'user?page=0&limit=100' )
  }


  getPostData(req: {page: number}): Observable<PostResponse>{
    return this.http.get<any>(this.baseUrl + 'post?page=' + req.page);
  }

  getPostById(id: number): Observable<PostResponse>{
    return this.http.get<any>(this.baseUrl + 'post/' + id);
  }

  createPost(data:any){
    console.log(data)
    return this.http.post<any>(this.baseUrl + 'post/create' , data)
  }

  updatePost(id:any, data:any){
    return this.http.put<any>(this.baseUrl + 'post/' + id, data)
  }
   
  deletePost(id:any){
    return this.http.delete(this.baseUrl + 'post/' + id)
  }
}
