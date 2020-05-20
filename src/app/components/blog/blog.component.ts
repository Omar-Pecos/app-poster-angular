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
  public ALL = false;

  public page = 1;
  public pagination;

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
      
      this.page = 1;

      if (this.filter == 'posts' && this.value == 'todos'){
        //ALL posts
        this.ALL = true;
        this.getPosts('',{});
        
      }else{
        //Posts filtered
        this.ALL = false;
        this.getFilteredPosts({});
       
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

  getPosts(lastValue,changePage){
    this._postService.getPosts(lastValue, changePage).subscribe(
      response =>{
          
          let data = response.posts;
          this.posts = data.results;
          let obj = {
            previous : data.previous,
            hasPrevious : data.hasPrevious ,
            next : data.next,
            hasNext : data.hasNext
          };
          this.pagination = obj;
          this.status = true;
          this.title = 'Todos los Posts';
      },
      error =>{
        console.log(error);
        this._postService.errorHandler(error);
      }
    )
}

changePage(direction){
  //console.log('entro!');
  this.status = false;

  //se entiende que son posts filtrados
  if (!this.ALL){

    if (direction == 'previous'){
      this.page--;
      this.getFilteredPosts( { direction , value : this.pagination.previous} );
    }else{
      this.page++;
      this.getFilteredPosts( { direction , value : this.pagination.next} );
    }

  }else{
      // Todos los posts
      if (direction == 'previous'){
        this.page--;
        this.getPosts('',{ direction , value : this.pagination.previous});
      }else{
        this.page++;
        this.getPosts('', { direction , value : this.pagination.next});
      }
  }
 
}

getFilteredPosts(changePage){
  this._postService.getFilteredPosts( this.filter , this.value , changePage).subscribe(
    response =>{
        
        let data = response.posts;
        this.posts = data.results;
        let obj = {
          previous : data.previous,
          hasPrevious : data.hasPrevious ,
          next : data.next,
          hasNext : data.hasNext
        };
        this.pagination = obj;
        this.status = true;

        if (this.value == 'Prog'){
          this.title = 'Programación';
        }else if (this.filter == 'user_id'){
          this.title = this.posts[0].author;
        }
        else{
          this.title = this.value;
        }
       
    },
    error =>{
      console.log(error);
      this._postService.errorHandler(error);
    }
  )
}


}
