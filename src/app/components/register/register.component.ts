import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: User;
  public confirmpassword;
  public errors: Array<any>;
  @Output() sendToApp = new EventEmitter();

  constructor(
    private _userService: UserService
  ) {
    this.errors = [];
    this.user = new User('','', '', '', '', true, ['user']);
  }

  ngOnInit(): void {
  }

  submitRegister(e) {
    this.errors = [];
    e.preventDefault();

    if (!this.validate()) {
     
       this.doRegister();
    }

  }

  validate() {
    /* Se puede validar con forms de angular ngtouched,ngdirty y etc (con html5) */
    let error = false;
    if (!this.user.fullname || !this.user.username || !this.user.email || !this.user.password || !this.confirmpassword) {
      this.errors.push('Por favor rellene todos los campos');
      error = true;
    }
    if (this.user.password != this.confirmpassword) {
      this.errors.push('La contraseña debe ser confirmada');
      error = true;
    }
    return error;
  }

  doRegister() {
    this._userService.doRegister(this.user).subscribe(
      response => {
        console.log(response.message);
        
        //evento al Padre
        this.sendToApp.emit({
          action : 'login',
          user : this.user
        });
      },
      error => {
        this.errors.push(error.error.message);
        console.log(error);
      });
  }

}
