import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public title = '...';
  public idPost;
  public post;
  public content;

  public viewingContent;
  public pos = 0;
  public modal = false;

  constructor(
    private _route : ActivatedRoute,
    private _postService : PostService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params =>{
      this.idPost = params['id'];
      console.log(params);
      
    });

    if (this.idPost){
      this.getPost();
    }
  }

  getPost(){
    this._postService.getPost( this.idPost ).subscribe( 
      response =>{
        this.post = response.post;
        this.content = this.post.content;
       // delete this.post.content;
        this.title = this.post.theme;
      },
      error =>{
        console.log(error);
      }
    );
  }

  openModal(posicion){
   // this.viewingContent = this.content[posicion];
   this.pos = posicion;
   this.viewingContent = '<h1>Hola!</h1><ul><li>hshdhs</li></ul>'+ this.content[posicion];
    this.modal = true;
  }

  closeModal(){
    this.modal = false;
  }

  next(){
    this.pos++;
    this.viewingContent = this.content[this.pos];
  }

}
