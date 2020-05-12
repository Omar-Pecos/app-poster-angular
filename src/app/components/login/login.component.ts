import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';

import {User} from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public token;
  public identity;
  public user : User;
  public errors : Array<any>;
  @Output() sendToApp = new EventEmitter();

  constructor(
      private _userService : UserService
  ) {
      this.user = new User('','','','',true,['user']);
      this.errors = [];
   }

  ngOnInit(): void {
  }

  submitLogin(e){
    this.errors = [];
    e.preventDefault();

    if (!this.validate()){
      this.doLogin();
    }

  }

  
  validate(){
    /* Se puede validar con forms de angular ngtouched,ngdirty y etc (con html5) */
   let error = false;
   if (!this.user.username ||!this.user.password){
     this.errors.push('Por favor rellene todos los campos');
     error = true;
   }

   return error;
 }

  doLogin(){
    this._userService.doLogin(this.user.username,this.user.password).subscribe( response =>{
  
      //set token
        this.token = response.accessToken;
        localStorage.setItem('token',this.token);
      //set identity
        delete response.accessToken;
        this.identity = response;
        localStorage.setItem('identity',JSON.stringify(this.identity));

        // si todo va bien - sendToApp que la action es inicio (por default)
        this.sendToApp.emit({
          action : 'inicio',
          username : this.user.username
        });

    },
      error =>{
        this.errors.push(error.error.message);
        console.log(error);
      }
    )
  }

}
