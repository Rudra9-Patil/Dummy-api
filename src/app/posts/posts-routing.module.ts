import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostsComponent } from './create-posts/create-posts.component';
import { PostsComponent } from './posts/posts.component';


const routes: Routes = [
  {path:'', component: PostsComponent},
  {path:'create', component: CreatePostsComponent},
  {path:'edit/:id', component: CreatePostsComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
