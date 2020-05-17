import { Component, OnInit, Input,SimpleChanges, OnChanges} from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnChanges{
  @Input() token;
  @Input() identity;
 @Input () status;
 @Input() posts;

  constructor(
    private _postService : PostService
  ) { }

  ngOnInit(): void {
   // this.comprobarParamsUrl();
  }

  ngOnChanges(changes : SimpleChanges){

   if (changes.posts){
     if (changes.posts.currentValue){
      this.setAllFavedGuys(this.posts);
     }
   } 
  }

  setAllFavedGuys(array){
    array.map(post =>{
      let cadena;
      let keys = Object.keys(post.favorites);
      let count = keys.length;

      if (count > 0){
          if (count == 1){
            cadena = 'A '+ keys[0] + ' le gusta';
          }else{
            let arreglo = [];
            for (let i = 0 ; i<keys.length ; i++){
              arreglo.push(keys[i]);
            }
            cadena = 'A ' +  arreglo.join(',') + ' les gusta';
          }
      }
      post.likes = cadena;
    });
  }

  /* Favs */
  doFav(posArray){
    this._postService.favorite(this.token , this.posts[posArray]._id ).subscribe(
      response =>{
        this.posts[posArray].favorites = response.post.favorites;
        this.setAllFavedGuys([this.posts[posArray]]);
      },
      error =>{
        console.log(error);
      }
    );
  }

  undoFav(posArray){
    this._postService.unfavorite(this.token , this.posts[posArray]._id).subscribe(
      response =>{
        this.posts[posArray].favorites = response.post.favorites;
        this.setAllFavedGuys([this.posts[posArray]]);
      },
      error =>{
        console.log(error);
      }
    );
  }

  countObj(obj){
    return Object.keys(obj).length;
  }

 /* comprobarParamsUrl(){
    if(this.last){
      this.getPosts(this.last);
    }else{
      if (this.filter && this.value){
        if (this.filter == 'posts' && this.value == 'todos'){
          //todos los posts
          this.getPosts('');
        }else{
          this.getFilteredPosts();
        }
      }
    }
  }*/

/*  ngOnChanges(simpleChanges : SimpleChanges){
  
    if (simpleChanges.filter){
      if (simpleChanges.filter.currentValue != simpleChanges.filter.previousValue || simpleChanges.value.currentValue != simpleChanges.value.previousValue ){
        this.comprobarParamsUrl();
      }
    }else if (simpleChanges.value){
      if ( simpleChanges.value.currentValue != simpleChanges.value.previousValue ){
        this.comprobarParamsUrl();
      }
    }
    
  }*/

}
