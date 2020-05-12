import { Component,DoCheck } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute,Params} from '@angular/router';

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

  constructor(
      private _route : ActivatedRoute,
      private _userService : UserService,
      private toastr : ToastrService
  ){
    //Ver si desde otro componente piden el login o register
      this._route.params.subscribe(params =>{
        
        let parametro = params['route'];
        
        if (parametro){
          this.changeHomeAction(parametro);
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
