import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';

//import Prism from 'prismjs';
import Prism from '../../../assets/js/prism';
import { error } from 'protractor';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, DoCheck {
  public identity;
  public token;
  public logued;

  public title = '...';
  public idPost;
  public post;
  public user;
  public withProgress = false;
  public content;

  public viewingContent;
  public pos = 0;
  public modal = false;

  constructor(
    private _route: ActivatedRoute,
    private _postService: PostService,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.idPost = params['id'];
    });

    if (this.idPost) {
      this.getPost();
    }

    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    if (this.token) {
      this.logued = true;
    } else {
      this.logued = false;
    }
  }

  ngDoCheck() {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    if (this.token) {
      this.logued = true;
    } else {
      this.logued = false;
    }
  }

  getPost() {
    this._postService.getPost(this.idPost).subscribe(
      response => {
        this.post = response.post;

        /*si identity - llamada al user y ver el progress */
        if (this.identity){
          this._userService.getUser( this.token , this.identity.id).subscribe(
            response =>{
              this.user = response.user;
              this.user.progress.map(obj =>{
                if (obj.post_id == this.post._id){
                  this.pos = obj.content;
                  this.withProgress = true;
                }
              });
            },
            error =>{
              console.log(error);
            }
          )
        }

        this.content = this.post.content;
        // delete this.post.content;
        this.title = this.post.theme;
      },
      error => {
        console.log(error);
      }
    );
  }
  openModal(posicion) {
    // this.viewingContent = this.content[posicion];
    //this.pos = posicion;
    this.viewingContent = this.content[posicion];

    this.modal = true;
    this.cargarEstilosCodigo();
  }

  cargarEstilosCodigo (){
    setTimeout(function () {
      let region = document.getElementById('contenido');
      console.log(region);

      Prism.highlightAllUnder(region);
    }, 1000);
  }

  closeModal() {
    // mejor poner otro boton para descartar el guardado o algo!
    if (this.withProgress){
      if ( (this.pos + 1) == this.content.length){
        // se ha terminado de leer y llama a setUnprogress
        this._userService.unsetProgress(this.token, this.post._id).subscribe(
          response =>{
            this.user = response.user;
            this.withProgress = false;
            this.pos = 0;
          },
          error =>{
            console.log(error);
          }
         )
      }
    }
    this.modal = false;
  }

  next() {
    this.pos++;
    this.viewingContent = this.content[this.pos];
    this.cargarEstilosCodigo();
  }

  previous() {
    this.pos--;
    this.viewingContent = this.content[this.pos];
    this.cargarEstilosCodigo();
  }

  // on load de Image Principal
  onLoadImg() {
    let img = document.getElementById('image') as HTMLImageElement;
    let imageWrap = document.getElementsByClassName('image-wrap') as HTMLCollectionOf<HTMLElement>;

    console.log('w : ' + img.width + ',' + img.height);
    console.log('wNat : ' + img.naturalWidth + ',' + img.naturalHeight);


    //si la foto es menos ancha que el total del imagewrap
    //lo ajusta y lo centra
    if (img.naturalWidth < img.width) {
      imageWrap[0].style.width = img.naturalWidth + 'px';
      imageWrap[0].style.margin = '0 auto';

    }

    //altura de imageWrap a la altura de la img en pc/movil
    imageWrap[0].style.height = img.height + 'px';

    /* deberia ajustarlo a max 500px de alto */
    if (img.height > 500) {
      let proporcionMenor = (1 * 500) / img.height;
      console.log(proporcionMenor);

      imageWrap[0].style.height = '500px';
      imageWrap[0].style.width = (img.width * proporcionMenor) + 'px';
      imageWrap[0].style.margin = '0 auto';
    }

  }

  openInNewTab(url) {
    window.open(url, '_blank');
  }

  /* Favs */
  doFav(){
    this._postService.favorite(this.token,this.post._id).subscribe(
      response =>{
        console.log(response);
        this.post = response.post;
      },
      error =>{
        console.log(error);
      }
    );
  }

  undoFav(){
    this._postService.unfavorite(this.token,this.post._id).subscribe(
      response =>{
        console.log(response);
        this.post = response.post;
      },
      error =>{
        console.log(error);
      }
    );
  }

   /* Progress */
   saveProgress(){
     this._userService.setProgress(this.token, this.post._id, this.pos).subscribe(
      response =>{
        this.user = response.user;
        this.user.progress.map(obj =>{
          if (obj.post_id == this.post._id){
            this.pos = obj.content;
            this.withProgress = true;
          }
        });
      },
      error =>{
        console.log(error);
      }
     )
   }
}
