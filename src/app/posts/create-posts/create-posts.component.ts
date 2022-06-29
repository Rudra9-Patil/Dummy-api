import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service'
import { postModel } from './create-post.model';

@Component({
  selector: 'app-create-posts',
  templateUrl: './create-posts.component.html',
  styleUrls: ['./create-posts.component.scss']
})
export class CreatePostsComponent implements OnInit {
  createPostForm: FormGroup;
  postModelObj: postModel = new postModel();
  usersData:any = [];
  post: any;
  ownerData:boolean = false;

  submitted:boolean = false;

  constructor(private fb: FormBuilder,
    route: ActivatedRoute,
    private router: Router,
    private postService: PostService) {
      this.buildForm();
    route.params.subscribe((params: any) => {
      console.log(params);
      if (params.id) {
        this.getPost(params.id);
      } else {
        this.addTag();
      }
    });
  }

  ngOnInit(): void {
    this.getUsers();
    
  }

 

  buildForm() {
    this.createPostForm = this.fb.group({
      text: ['', Validators.required],
      likes: ['',Validators.required],
      owner: ['',Validators.required],
      image: ['',Validators.required],
      tags: this.fb.array([])
    });
  }

  get f() { return this.createPostForm.controls; }

  tags(): FormArray {
    return this.createPostForm.get("tags") as FormArray
  }

  getPost(id: number) {
    this.postService.getPostById(id).subscribe((res: any) => {
      this.post = res;
      this.createPostForm.patchValue(res);
      this.createPostForm.patchValue({
        owner:res.owner.id
      });
      this.post.tags.forEach((tag: string) => {
        this.addTag(tag);
      });
    });
    
  }

  newTag(val = ''): FormGroup {
    return this.fb.group({
      tag: val,
    })
  }



  addTag(val = '') {
    this.tags().push(this.newTag(val));
  }

  getUsers(){
    this.postService.getusers().subscribe((res:any)=>{
      this.usersData =  res.data;
      console.log(res,"users")
    })
  }


  deleteTag(index: number) {
    this.tags().removeAt(index);
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.post,"idddd");
    
    let tagData: any = [];
    this.createPostForm.value.tags.forEach((res: any) => {
      tagData.push(res.tag)
    })
    

    this.postModelObj.text = this.createPostForm.value.text;
    this.postModelObj.image = this.createPostForm.value.image;
    this.postModelObj.likes = this.createPostForm.value.likes;
    this.postModelObj.tags = tagData;
    this.postModelObj.owner = this.createPostForm.value.owner;
    console.log(this.postModelObj);
    if(!this.post){
    this.postService.createPost(this.postModelObj).subscribe((res: any) => {
      console.log(res, "create");
      this.router.navigate(['/posts'])
    });
  }else{
    this.postService.updatePost( this.post.id,this.postModelObj).subscribe((res: any) => {
      console.log(res, "update");
      this.router.navigate(['/posts'])
    });
  }

  }
}
