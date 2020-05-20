import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit,DoCheck {
  public token;
  public identity;

  public status = false;
  public users;
  public adminId;
  public adminRoleId;

  public page = 1;
  public pagination;

  constructor(
    private _userService: UserService,
    private _router : Router
  ) { }

  ngOnInit(): void {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();

    //posible 401 y 403
    if (!this.identity){
      this._router.navigate(['/error/401']);
    }
    if (this.identity.role != 1){
      this._router.navigate(['/error/403']);
    }

    this.page = 1;

    this.adminId = this.identity.id;
    this.getUsers({});
  }

  ngDoCheck(){
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }

  getUsers(changePage){
    this._userService.getUsers( this.token , changePage ).subscribe(
      response =>{
        let data = response.users;
       let users = data.results;
       this.users = users;

       let obj = {
        previous : data.previous,
        hasPrevious : data.hasPrevious ,
        next : data.next,
        hasNext : data.hasNext
      };
      this.pagination = obj;

       this.setAdminOrNot(users);
       this.status = true;

      },
      error =>{
        console.log(error);
        this._userService.errorHandler(error);
      }
    )
  }

  changePage(direction){
    this.status = false;
    
    if (direction == 'next'){
      this.getUsers({ direction , value : this.pagination.next});
    }else{
      this.getUsers({ direction , value : this.pagination.previous});
    }
    
  }

  setAdminOrNot(array){
    if (!this.adminRoleId){
      this.users.map(user =>{
        if (user._id == this.adminId){
          this.adminRoleId = user.roles[0];
        }
      });
    }
   
    array.map(user =>{
      if (user.roles[0] == this.adminRoleId){
        user.admin = true;
      }else{
        user.admin = false;
      }
    });
  }

  blockUser(id, pos){
    this._userService.block( this.token , id).subscribe(
      response =>{
        this.users[pos] = response.user;
        this.setAdminOrNot([this.users[pos]]);
      }, 
      error =>{
        console.log(error);
        this._userService.errorHandler(error);
      }
    );
  }

  grantUser(id,pos){
    this._userService.grant( this.token , id).subscribe(
      response =>{
        this.users[pos] = response.user;
        this.setAdminOrNot([this.users[pos]]);
      }, 
      error =>{
        console.log(error);
        this._userService.errorHandler(error);
      }
    );
  }

  revokeUser(id,pos){
    this._userService.revoke( this.token , id).subscribe(
      response =>{
        this.users[pos] = response.user;
        this.setAdminOrNot([this.users[pos]]);
      }, 
      error =>{
        console.log(error);
        this._userService.errorHandler(error);
      }
    );
  }

}
