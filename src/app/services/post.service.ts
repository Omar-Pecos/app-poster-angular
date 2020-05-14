import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global} from './global';

@Injectable({
    providedIn : "root"
})

export class PostService{
    
    public URL;

    constructor(
        private _http : HttpClient
    ){
        this.URL = Global.url;
    }

    /* POSTS */
    getPosts(last): Observable<any>{
        let urlParam = '';
        if (last == 'true'){
            urlParam = '/true';
        }
        return this._http.get(this.URL + 'posts' + urlParam);
    }
    getFilteredPosts(filter,value) : Observable<any>{
        let urlParam = '?field='+filter+'&value='+value;
       
        return this._http.get(this.URL + 'filterposts' + urlParam);
    }
    
    getPost(id) : Observable<any>{
        return this._http.get(this.URL + 'post/'+ id);
    }

    createPost(token,post){
        let headers = new HttpHeaders()
            .set('x-access-token', token);
        return this._http.post(this.URL + 'posts/create', post , {headers : headers});
    }

    /* CATS */
    getCategories() : Observable<any>{
        return this._http.get(this.URL + 'category');
    }
   /* la ruta de la API tampoco hace falta 
    getCategory(name) : Observable<any>{
        return this._http.get(this.URL + 'cat/'+name);
    }*/

    createCategory(token,name,theme) : Observable<any>{
        let headers = new HttpHeaders()
            .set('x-access-token',token);
        return this._http.post(this.URL + 'category/create',{name,theme},{headers : headers});
    }

    editCategory(token,id,name,theme) : Observable<any>{
        let headers = new HttpHeaders()
            .set('x-access-token',token);
        return this._http.put(this.URL + 'category/edit/'+id,{name,theme},{headers : headers});
    }

    deleteCategory(token,id) : Observable<any>{
        let headers = new HttpHeaders()
            .set('x-access-token',token);
        return this._http.delete(this.URL + 'category/delete/'+id,{headers : headers});
    }

}