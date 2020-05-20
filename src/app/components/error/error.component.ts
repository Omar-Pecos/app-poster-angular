import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  public code = '0';
  public title = 'Error';

  constructor(
      private _route : ActivatedRoute,
      private _router : Router
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params =>{
      if (params['code']){
        this.code = params['code'];
        this.title = 'Error ' + this.code;
      }

        //setTimeout
        this.cuentaAtras();
    });
  }

  cuentaAtras(){
    setTimeout(() =>{
      switch(this.code){
        case '0':
          this._router.navigate(['/home/inicio']);
          break;
        case '401':
          this.checkAndDoLogout();
          this._router.navigate(['/home/login']);
          break;
        case '403':
        this._router.navigate(['/home/inicio']);
        break;
        case '404':
        this._router.navigate(['/home/inicio']);
        break;
        default: 
        this._router.navigate(['/home/inicio']);
      }
      
    },3000);
  }

  checkAndDoLogout(){
    if (localStorage.getItem('token')){
      localStorage.removeItem('token');
    }
   
    if (localStorage.getItem('identity')){
      localStorage.removeItem('identity');
    }
  }

}
