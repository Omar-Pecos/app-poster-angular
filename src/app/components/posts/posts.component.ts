import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PostService } from '../../services/post.service';
import { error } from 'protractor';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit,OnChanges {

  public posts;
  @Input() last;
  @Input() filter;
  @Input() value;

  constructor(
      private _postService : PostService
  ) { }

  ngOnInit(): void {
    this.comprobarParamsUrl();
  }

  comprobarParamsUrl(){
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
  }

 /* ngDoCheck(){
    this.comprobarParamsUrl();
  }*/

  ngOnChanges(simpleChanges : SimpleChanges){
  
    if (simpleChanges.filter){
      if (simpleChanges.filter.currentValue != simpleChanges.filter.previousValue || simpleChanges.value.currentValue != simpleChanges.value.previousValue ){
        this.comprobarParamsUrl();
      }
    }else if (simpleChanges.value){
      if ( simpleChanges.value.currentValue != simpleChanges.value.previousValue ){
        this.comprobarParamsUrl();
      }
    }
    
  }

  getPosts(lastValue){
      this._postService.getPosts(lastValue).subscribe(
        response =>{
            this.posts = response.posts;
        },
        error =>{
          console.log(error);
        }
      )
  }

  getFilteredPosts(){
    this._postService.getFilteredPosts( this.filter , this.value ).subscribe(
      response =>{
          this.posts = response.posts;
      },
      error =>{
        console.log(error);
      }
    )
  }

}
