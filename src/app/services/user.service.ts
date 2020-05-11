import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global} from './global';

@Injectable({
    providedIn : 'root'
})
export class UserService{

    public URL;
    public identity;
    public token;

    constructor(
        private _http : HttpClient
    ){
        this.URL = Global.url;
    }

    doLogin(username,password) : Observable<any>{
        return this._http.post(this.URL + 'auth/login',{username,password});
    }

    doRegister(user) : Observable<any>{
        return this._http.post(this.URL + 'auth/register',user);
    }

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));
        if (identity != undefined){
           return identity;
        }else{
            return null;
        }
    }

    getToken(){
        let token = localStorage.getItem('token');

        if (token != undefined){
            return token;
        }
        else{
            return null;
        }
    }
}
