import { Component, OnInit, DoCheck } from '@angular/core';
import {UserService} from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { error } from 'protractor';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  public token;
  public identity;
  public logued;

  public user;
  public postsFav;
  public postsinProgress;
  public statusFav = false;
  public statusProgress = false;

  constructor(
      private _userService : UserService,
      private _postService : PostService
  ) { }

  ngOnInit(): void{
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    if (this.token){
      this.logued = true;
    }else{
      this.logued = false;
    }

    //1º GetUser
   this.getUser();
   
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

  getUser(){
    this._userService.getUser(this.token , this.identity.id ).subscribe(
      response =>{
        this.user = response.user;
        
         //getFavs()
        this.getFavs();
        //getInProgress()
        this.getInProgress();
      },
      error =>{
        console.log(error);
        this._postService.errorHandler(error);
      }
    )
  }

  getFavs(){
    this._postService.getPostsCollection( this.user.favorites ).subscribe(
      response =>{
        this.postsFav = response.posts;
        this.statusFav = true;
      },
      error =>{
        console.log(error);
        this._postService.errorHandler(error);
      }
    )
  }

  getInProgress(){
    let collection = [];

    if (this.user.progress.length > 0){
      this.user.progress.map( obj =>{
        collection.push(obj.post_id);
      });

      this._postService.getPostsCollection(collection).subscribe(
        response =>{
          this.postsinProgress = response.posts;
          this.statusProgress = true;
        },
        error =>{
          console.log(error);
          this._postService.errorHandler(error);
        }
      )
    }else{
      this.postsinProgress = collection;
      this.statusProgress = true;
    }
   

  }

}
