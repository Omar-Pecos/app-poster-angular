import { Component,DoCheck } from '@angular/core';
import {UserService} from '../../services/user.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  providers : [UserService]
})
export class HomeComponent implements DoCheck {

  public token;
  public identity;
  public homeAction = 'none';s

  constructor(
      private _userService : UserService,
      private toastr : ToastrService
  ){
      this.token = this._userService.getToken();
      this.identity = this._userService.getIdentity();
  }

  changeHomeAction(action){
    this.homeAction = action;
  }

  ngDoCheck(){
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
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
