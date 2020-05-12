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
    getCategories() : Observable<any>{
        return this._http.get(this.URL + 'category');
    }
    getPost(id) : Observable<any>{
        return this._http.get(this.URL + 'post/'+ id);
    }
}