import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global} from './global';
import {Router} from '@angular/router';

@Injectable({
    providedIn : "root"
})

export class PostService{
    
    public URL;

    constructor(
        private _http : HttpClient,
        private _router : Router
    ){
        this.URL = Global.url;
    }

    /* POSTS */
    getPosts( last, changePage): Observable<any>{
        let urlParam = '';
        if (last == 'true'){
            urlParam = '/true';
        }
        if (Object.keys(changePage).length > 0){
            urlParam = '?' + changePage.direction + '=' + changePage.value;
        }
        
        return this._http.get(this.URL + 'posts' + urlParam);
    }
    getFilteredPosts(filter,value, changePage) : Observable<any>{
        let urlParam = '?field='+filter+'&value='+value;
        
        if (Object.keys(changePage).length > 0){
            urlParam += '&' + changePage.direction + '=' + changePage.value;
        }
        return this._http.get(this.URL + 'filterposts' + urlParam);
    }
    
    getPost(id) : Observable<any>{
        return this._http.get(this.URL + 'post/'+ id);
    }

    searchPosts(search) : Observable<any>{
        return this._http.get(this.URL + 'searchposts/'+ search);
    }

    getPostsCollection(collection):Observable<any>{
        return this._http.post(this.URL + 'posts/collection', {collection});
    }

    createPost(token,post){
        let headers = new HttpHeaders()
            .set('x-access-token', token);
        return this._http.post(this.URL + 'posts/create', post , {headers : headers});
    }

    editPost(token,postId,post){
        let headers = new HttpHeaders()
            .set('x-access-token', token);
        return this._http.put(this.URL + 'posts/edit/'+postId, post , {headers : headers});
    }

    deletePost(token,postId) : Observable<any>{
        let headers = new HttpHeaders()
            .set('x-access-token', token);
        return this._http.delete(this.URL + 'posts/delete/'+ postId, {headers});
    }

    favorite(token,postId) : Observable<any>{
        let headers = new HttpHeaders()
        .set('x-access-token', token);
        return this._http.post(this.URL + 'post/favorite', {postId} , {headers : headers});
    }

    unfavorite(token,postId) : Observable<any>{
        let headers = new HttpHeaders()
        .set('x-access-token', token);
        return this._http.post(this.URL + 'post/unfavorite', {postId} , {headers : headers});
    }

    /* CATS */
    getCategories() : Observable<any>{
        return this._http.get(this.URL + 'category');
    }

    getCategoriesByTheme(theme) : Observable<any>{
        return this._http.get(this.URL + 'category/' + theme);
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