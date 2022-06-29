import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts/posts.component';
import { CreatePostsComponent } from './create-posts/create-posts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchPipe } from '../pipes/search.pipe';



@NgModule({
  declarations: [
    PostsComponent,
    CreatePostsComponent,
    SearchPipe,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    PostsRoutingModule,
    ReactiveFormsModule,
  ]
})
export class PostsModule { }
