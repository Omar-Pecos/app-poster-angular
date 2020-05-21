import { Component, OnInit, DoCheck } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {PostService} from '../../services/post.service';
import {ToastrService} from 'ngx-toastr';
import {Post} from '../../models/post';

//Prism
import Prism from '../../../assets/js/prism';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit,DoCheck{
  public token;
  public identity;
  public logued;
  public errors = [];

  public post : Post;
  public cats;
  public dataModel;
  public edicion;
  public secToEdit = 0;

  constructor(
    private _router : Router,
    private _userService : UserService,
    private _postService : PostService,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {

    this.post = new Post('','','',[],'','','','-1','-1','',{});
    
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    if (this.token){
      this.logued = true;
    }else{
      this.logued = false;
    }

    // posible 401
    if (!this.identity){
      this._router.navigate(['/error/401']);
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

  //guarda a content y vacia el editor
  nuevaSeccion(){
    if (this.dataModel != ''){
      this.post.content.push(this.dataModel);
      this.dataModel = '';

      this.cargarEstilosCodigo();
    }
  }

  //Ver la seleccion
  editarSeccion(pos){
    this.edicion = true;
    this.dataModel = this.post.content[pos];
  }

  guardarEdicion(pos){
    this.post.content[pos] = this.dataModel;
    this.dataModel = '';
    this.edicion = false;

    this.cargarEstilosCodigo();
  }

  //crear Post enviando el FORM
  submitPost(e){
    e.preventDefault();
    
    //añadir el user_id
    this.post.user_id = this.identity.id;
   
    //validate
   const valid = this.validate();
   if (valid){
     this.crearPost();
   }
   
  }

  validate(){
    this.errors = [];
    let post = this.post;
    if (!post.title ||!post.content || post.theme == '-1' || post.category == '-1'){
      this.errors.push('Debe completar todos los campos');
      return false;
    }else{
      return true;
    }
  }

  crearPost(){
    this._postService.createPost(this.token , this.post).subscribe(
      response =>{
        this._router.navigate(['/blog/posts/todos']);
        //toastr
        this.toastr.success('Post "'+this.post.title+'" creado correctamente','¡Éxito!');
      },
      error =>{
        console.log(error);
        if (error.status == 409){
          this.errors.push(error.error.message);
        }else{
          this._postService.errorHandler(error);
        }
 
       /* if (error.error.message == 'Unauthorized!'){
          this.toastr.error('Inicie sesión de nuevo. Lo sentimos el progreso se perderá','¡Error!');
        }else{
          this.toastr.error('Algún error ocurrió.Intentelo de nuevo más tarde','¡Error!');
        }*/
      }
    );
  }

  deleteSeccion(pos){
    this.post.content.splice(pos,1);
  }

  onChangeSelected(){
    if (this.post.theme != '-1'){
      //getCats
      this._postService.getCategoriesByTheme( this.post.theme ).subscribe(
        response =>{
          this.cats = response.categories;
        },
        error =>{
          console.log(error);
        }
      )
    }
  }

  cargarEstilosCodigo (){
    setTimeout(function () {
      let regions = document.getElementsByClassName('contenidos');
      
      for (let i = 0; i < regions.length ; i++){
        Prism.highlightAllUnder(regions[i]);
      }
      
    }, 1000);
  }

}
