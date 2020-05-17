import { Component,DoCheck } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr'

@Component({
    selector : 'app-header',
    templateUrl : './header.component.html',
    providers : [UserService]
})
export class HeaderComponent implements DoCheck {
  public dropdown = false;
  public identity;

  constructor(
    private toastr : ToastrService,
    private _userService : UserService
){
   
    this.identity = this._userService.getIdentity();
}

ngDoCheck(){
  this.identity = this._userService.getIdentity();
}

logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('identity');

     //prueba toastr
     this.toastr.warning( 'Te esperamos de vuelta','¡Adios!');
  }

  doDropdown(){
    if (this.dropdown){
      this.dropdown = false;
    }else{
      this.dropdown = true;
    }
  }

}