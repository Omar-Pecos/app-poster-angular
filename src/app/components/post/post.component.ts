import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {UserService} from '../../services/user.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit ,DoCheck{
  public identity;
  public token;
  public logued;

  public title = '...';
  public idPost;
  public post;
  public content;

  public viewingContent;
  public pos = 0;
  public modal = false;

  constructor(
    private _route : ActivatedRoute,
    private _postService : PostService,
    private _userService : UserService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params =>{
      this.idPost = params['id'];
      console.log(params);
      
    });

    if (this.idPost){
      this.getPost();
    }

    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    if (this.token){
      this.logued = true;
    }else{
      this.logued = false;
    }
  }

  ngDoCheck(){
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    if (this.token){
      this.logued = true;
    }else{
      this.logued = false;
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
   //this.pos = posicion;
   this.viewingContent = this.content[posicion];
    this.modal = true;
  }

  closeModal(){
    this.modal = false;
  }

  next(){
    this.pos++;
    this.viewingContent = this.content[this.pos];
  }

  previous(){
    this.pos--;
    this.viewingContent = this.content[this.pos];
  }

  // on load de Image Principal
  onLoadImg(){
    let img = document.getElementById('image') as HTMLImageElement;
    let imageWrap = document.getElementsByClassName('image-wrap') as HTMLCollectionOf<HTMLElement>;

    console.log('w : '+img.width+','+img.height);
    console.log('wNat : '+img.naturalWidth+','+img.naturalHeight);
    

    //si la foto es menos ancha que el total del imagewrap
    //lo ajusta y lo centra
    if (img.naturalWidth < img.width){
        imageWrap[0].style.width = img.naturalWidth+'px';
        imageWrap[0].style.margin = '0 auto';
    
    }

    //altura de imageWrap a la altura de la img en pc/movil
    imageWrap[0].style.height = img.height+'px'; 

    /* deberia ajustarlo a max 500px de alto */
    if (img.height > 500){
      let proporcionMenor = (1 * 500) / img.height;
      console.log(proporcionMenor);
      
      imageWrap[0].style.height = '500px';
      imageWrap[0].style.width = (img.width * proporcionMenor) + 'px';
      imageWrap[0].style.margin = '0 auto';
    }
    
  }

  openInNewTab(url){
    window.open(url,'_blank');
  }
}
