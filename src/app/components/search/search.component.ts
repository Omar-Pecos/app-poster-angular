import { Component, OnInit, DoCheck } from '@angular/core';
import {UserService} from '../../services/user.service';
import { PostService } from '../../services/post.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public token;
  public identity;
  public logued;

  public posts;
  public status = false;

  public title;
  public search;

  constructor(
    private _route : ActivatedRoute,
    private _userService : UserService,
    private _postService : PostService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params =>{
      this.search = params['search'];

      this.doSearch();
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

  doSearch(){
    this._postService.searchPosts( this.search ).subscribe(
      response =>{
        this.status = true;
        this.posts = response.posts;
        this.title = 'Búsqueda : '+this.search;
      },
      error =>{
        console.log(error);
      }
    ) 
  }

}
