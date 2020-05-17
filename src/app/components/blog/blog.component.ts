import { Component, OnInit, DoCheck } from '@angular/core';
import {UserService} from '../../services/user.service';
import { PostService } from '../../services/post.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit,DoCheck {

  public token;
  public identity;
  public logued;

  public posts;
  public status = false;

  public title;
  public filter;
  public value;

  constructor(
      private _route : ActivatedRoute,
      private _userService : UserService,
      private _postService : PostService
  ) { 
   
  }

  ngOnInit(){
    this._route.params.subscribe(params =>{
      this.filter = params['filter'];
      this.value = params['value'];
      
      if (this.filter == 'posts' && this.value == 'todos'){
        //ALL posts
        this.getPosts('');
        
      }else{
        //Posts filtered
        this.getFilteredPosts();
       
      }
    });

    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    if (this.token){
      this.logued = true;
    }else{
      this.logued = false;
    }
  }

  ngDoCheck(){
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
     if (this.token){
        this.logued = true;
      }else{
        this.logued = false;
      }
  }

  getPosts(lastValue){
    this._postService.getPosts(lastValue).subscribe(
      response =>{
          this.status = true;
          this.posts = response.posts;
          this.title = 'Todos los Posts';
      },
      error =>{
        console.log(error);
      }
    )
}

getFilteredPosts(){
  this._postService.getFilteredPosts( this.filter , this.value ).subscribe(
    response =>{
        this.status = true;
        this.posts = response.posts;
        this.title = this.value;
    },
    error =>{
      console.log(error);
    }
  )
}


}
