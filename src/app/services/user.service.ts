import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
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
        private _http : HttpClient,
        private _router : Router
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

    /* getUsers */
    getUser(token,userId) : Observable<any> {
        let headers = new HttpHeaders()
            .set('x-access-token',token);
        return this._http.get(this.URL + 'user/'+userId, {headers});
    }

    getUsers(token, changePage) : Observable<any> {
        let urlParam = '';
        let headers = new HttpHeaders()
        .set('x-access-token',token);

        if (Object.keys(changePage).length > 0){
            urlParam = '?' + changePage.direction + '=' + changePage.value;
        }
        return this._http.get(this.URL + 'users' + urlParam, {headers});
    }

    editUser (token, userId , body) :Observable<any>{
        let headers = new HttpHeaders()
            .set('x-access-token',token);
        return this._http.put(this.URL + 'users/edit/'+userId, body, {headers})
    }

    /* Block */
    block(token, userId) : Observable<any>{
        let headers = new HttpHeaders()
        .set('x-access-token',token);
        return this._http.get( this.URL + 'users/block/' + userId, {headers});   
    }

    /* Grant/revoke */ 
    grant(token, userId) : Observable<any>{
        let headers = new HttpHeaders()
        .set('x-access-token',token);
        return this._http.get( this.URL + 'users/grant/' + userId, {headers});   
    }

    revoke(token, userId) : Observable<any>{
        let headers = new HttpHeaders()
        .set('x-access-token',token);
        return this._http.get( this.URL + 'users/revoke/' + userId, {headers});   
    }

    /* Progress */
    setProgress(token,postId,pos) : Observable<any>{
        let headers = new HttpHeaders()
        .set('x-access-token', token);
        return this._http.post(this.URL + 'users/setprogress', {post_id : postId,content : pos} , {headers : headers});
    }

    unsetProgress(token,postId) : Observable<any>{
        let headers = new HttpHeaders()
        .set('x-access-token', token);
        return this._http.post(this.URL + 'users/unsetprogress', {post_id : postId} , {headers : headers});
    }

     /* Error Handler */
     errorHandler(error){
        //token no valido o no le pasa token
        if (error.error.message == 'Unauthorized!'){
            this._router.navigate(['/error/401']);  
        }else if (error.status == 403){
            this._router.navigate(['/error/403']);
        }else if (error.error.status = 'error404'){
            this._router.navigate(['/error/404']);
        }
        else if (error.status == 500){
            this._router.navigate(['/error/500']);
        }
        else{
            // error general
            this._router.navigate(['/error']);
        }
    }
}
