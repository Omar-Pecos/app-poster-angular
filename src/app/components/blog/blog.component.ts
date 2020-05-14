import { Component, OnInit, DoCheck } from '@angular/core';
import {UserService} from '../../services/user.service';
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

  public title;
  public filter;
  public value;

  constructor(
      private _route : ActivatedRoute,
      private _userService : UserService
  ) { 
   
  }

  ngOnInit(){
    this._route.params.subscribe(params =>{
      this.filter = params['filter'];
      this.value = params['value'];
      
      if (this.filter == 'posts' && this.value == 'todos'){
        this.title = 'Todos los Posts';
      }else{
        this.title = this.value;
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


}
