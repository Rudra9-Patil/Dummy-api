import { Component, OnInit } from '@angular/core';
import {PostService} from '../../services/post.service'
import { Router } from '@angular/router';
import { PostResponse } from 'src/app/models/posts';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  public postData:any;
  searchPost: any;
  public posts:any;
  isDeleting: boolean;
  pager: any;
  
  constructor(private postService:PostService,
    private paginationSer: PaginationService,
    private router: Router) { }

  ngOnInit(): void {
    this.getPosts(1);
  }

  next() {
    if (this.pager?.currentPage < 44) {
      this.getPosts(this.pager?.currentPage + 1);
    }
  }

  prev() {
    if (this.pager?.currentPage > 1) {
      this.getPosts(this.pager?.currentPage - 1);
    }
  }

  getPosts(pageNumber: number) {
    const req = {
      page: pageNumber - 1
    };
    this.postService.getPostData(req).subscribe((res: PostResponse)=>{
      this.postData = res;
      this.posts = res.data;
      console.log(this.postData);
      
      this.setPage(this.postData.page);
    });
  }

  private setPage(page: number) {
    this.pager = this.paginationSer.paginate(this.postData.total, page+1, this.postData.limit);
  }

  gotoPage(){
    this.router.navigate(['posts/create']);
  }
  // gotoview(){
  //   this.router.navigate(['posts/view']);
  // }

  deletePostData(id:any){
    if (this.isDeleting) {
      return;
    }
    this.isDeleting = true;
      this.postService.deletePost(id).subscribe((res:any)=>{
        this.isDeleting = false;
        this.getPosts(1);
      },err => {
        this.isDeleting = false;
      })
  }


}
