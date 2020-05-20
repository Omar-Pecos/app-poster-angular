import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, DoCheck {
  public token;
  public identity;
  public logued;

  public title;
  public user: User;
  public userId;
  public newPass;
  public confirmPass;
  public errors = [];

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router : Router,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    if (this.token) {
      this.logued = true;
    } else {
      this.logued = false;
    }

    //posible 401
    if (!this.identity){
      this._router.navigate(['/error/401']);
    }

    this._route.params.subscribe(params => {
      this.userId = params['id'];

      if (this.userId != this.identity.id && this.identity.role != 1) {
        //posible 403
        this._router.navigate(['/error/403']);
      } else {
        //getUser()
        this.getUser();
      }
    });

  }

  ngDoCheck() {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    if (this.token) {
      this.logued = true;
    } else {
      this.logued = false;
    }
  }

  getUser() {
    this._userService.getUser(this.token, this.userId).subscribe(
      response => {
        this.user = response.user;
        this.title = this.user.fullname;
      },
      error => {
        console.log(error);
        //posible 404
        this._userService.errorHandler(error);
      }
    )

  }

  submitEdit(e) {
    e.preventDefault();

    let valid = this.validate();
    if (valid){
      let jsonBody = {
        user: this.user,
        pass:
          { 
             new: this.newPass,
             confirm: this.confirmPass
           }
      };

      this.editUser(jsonBody);

    }else{
      this.errors.push('Si deseas cambiar la contraseña deben rellenarse todos los campos');
    }
    
  }

  editUser(payload){
    this._userService.editUser( this.token , this.userId , payload).subscribe(
      response =>{
        this.user = response.user;
        this.newPass = '';
        this.confirmPass = '';

        //toastr.success
        this.toastr.success('"'+ this.user.fullname+'" modificado correctamente','¡Éxito!');
      },
      error =>{
        console.log(error);
        if (error.status == 409){
          this.errors.push(error.error.message);
        }else{
          this._userService.errorHandler(error);
        }
      }
    )
  }

  validate(){
    this.errors = [];

    if (this.user.password){
      if (this.newPass && this.confirmPass){
        return true;
      }else{
        return false;
      }
    }else{
      if (this.newPass && this.confirmPass){
        return false;
      }
      return true;
    }
  }

}
