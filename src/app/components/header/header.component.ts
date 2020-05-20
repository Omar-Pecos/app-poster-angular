import { Component,DoCheck } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';

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
    private _userService : UserService,
    private _router : Router
){
   
    this.identity = this._userService.getIdentity();
}

ngDoCheck(){
  this.identity = this._userService.getIdentity();
}

logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('identity');

    if (this.dropdown){
      this.doDropdown();
    }

    this._router.navigate(['/home/login']);

     //prueba toastr
     this.toastr.warning( 'Te esperamos de vuelta','¡Adios!');
  }

  doDropdown(){
    if (this.dropdown){
      this.dropdown = false;

      if (window.screen.width < 500){
        let header = document.getElementById('header');
        header.style.paddingBottom = '0px';
      }
    }else{
      this.dropdown = true;

     if (window.screen.width < 500){
       let size = '105px';
        if (this.identity.role == 1){
          size = '150px';
        }
        let header = document.getElementById('header');
        header.style.paddingBottom = size;
      }
    }
  }

}