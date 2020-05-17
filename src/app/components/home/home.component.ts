import { Component} from '@angular/core';
import {UserService} from '../../services/user.service';
import { PostService } from '../../services/post.service';
import {ActivatedRoute} from '@angular/router';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  providers : [UserService]
})
export class HomeComponent {

  public token;
  public identity;
  public homeAction = 'inicio';
  public logued;

  public posts;
  public status = false;

  constructor(
      private _route : ActivatedRoute,
      private _userService : UserService,
      private _postService : PostService,
      private toastr : ToastrService
  ){
    //get LastPosts
    this.getPosts('true');

    //Ver si desde otro componente piden el login o register
      this._route.params.subscribe(params =>{
        
        let parametro = params['route'];
        
        if (parametro == 'login' || parametro == 'register'){
          this.changeHomeAction(parametro);
        }else{
          this.changeHomeAction('inicio');
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

  getPosts(lastValue){
    this._postService.getPosts(lastValue).subscribe(
      response =>{
          this.status = true;
          this.posts = response.posts;
      },
      error =>{
        console.log(error);
      }
    )
}

  changeHomeAction(action){
    this.homeAction = action;
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

  dataFromLogin($event){
    this.changeHomeAction($event.action);
    //toast de login
    this.toastr.info('Esperemos que disfrutes, '+$event.username,'¡Hola!');
  }

  dataFromRegister($event){
      this.changeHomeAction($event.action);
      //toast de bienvenida
    this.toastr.success('Te has registrado, '+$event.user.fullname+ '. Inicia sesión ahora con tu nombre de usuario y contraseña','¡Bienvenido!');
  }
}
