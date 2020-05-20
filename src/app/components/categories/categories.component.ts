import { Component, DoCheck } from '@angular/core';
import {UserService} from '../../services/user.service';
import {PostService} from '../../services/post.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements DoCheck {
  public identity;
  public token;
  public logued;

  public status;
  public catsArte;
  public catsProg;
  public catsRecetas;
  public catsOtros;

  public createModal = false;
  public editModal = false;
  public deleteModal = false;
  public idCat;
  public selectTema;
  public nombreCat;

  constructor(
    private _userService : UserService,
    private _postService : PostService,
    private toastr : ToastrService
  ) {
      this.token = this._userService.getToken();
      this.identity = this._userService.getIdentity();
      if (this.token){
        this.logued = true;
      }else{
        this.logued = false;
      }

      this.getCategories();
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

  getCategories(){
    this.status = false;
    this.catsRecetas = [];
    this.catsProg = [];
    this.catsArte = [];
    this.catsOtros = [];

    this._postService.getCategories().subscribe(
      response =>{
        
        let cats = response.categories;

        cats.map(cat =>{
          if (cat.theme == 'Recetas'){
            this.catsRecetas.push(cat);
          }
          if (cat.theme == 'Prog'){
            this.catsProg.push(cat);
          }
          if (cat.theme == 'Arte'){
            this.catsArte.push(cat);
          }
          if (cat.theme == 'Otros'){
            this.catsOtros.push(cat);
          }
       });

       this.status = true;

      },
      error =>{
        console.log(error);
        this._postService.errorHandler(error);  
      }
    )
  }

  createCat(e){
    e.preventDefault();

    this._postService.createCategory(this.token, this.nombreCat, this.selectTema).subscribe(
      response =>{
        console.log(response);
          this.closeModal('create');
          this.getCategories();
          this.toastr.success('Nueva categoría creada','¡Éxito!');
      },
      error =>{
        console.log(error);
        this._postService.errorHandler(error);
      }
    )
  }

  openCreateModal(){
    this.selectTema = '';
    this.nombreCat = '';

    this.createModal = true;
  }
  

  /* Edit modal */
  openEditModal(cat){

        this.idCat = cat._id;
        this.selectTema = cat.theme;
        this.nombreCat = cat.name;

        this.editModal = true;
  }

  editCat(e){
    e.preventDefault();
    
    console.log(this.selectTema+' '+this.nombreCat);

    this._postService.editCategory(this.token,this.idCat, this.nombreCat, this.selectTema).subscribe(
      response =>{
        console.log(response);
          this.closeModal('edit');
          this.getCategories();
          this.toastr.success('La categoría "'+this.nombreCat +'" ha sido editada correctamente','¡Éxito!');
      },
      error =>{
        console.log(error);
        this._postService.errorHandler(error);
      }
    )
  }
  

  /*Delete Modal*/
  openDeleteModal(cat){
    this.idCat = cat._id;
    this.selectTema = cat.theme;
    this.nombreCat = cat.name;

    this.deleteModal = true;
  }
  

  deleteCat(){
    this._postService.deleteCategory(this.token,this.idCat).subscribe(
      response =>{
        let cat = response.category;
        let tema = '';
        if (cat.theme == 'Prog'){
          tema = 'Programación';
        }else{
          tema = cat.theme;
        }
        this.closeModal('delete');
        this.getCategories();
        this.toastr.warning('La categoría "'+ cat.name +'" de '+ tema +' ha sido eliminada correctamente','¡Éxito!');
      },
      error =>{
        console.log(error);
        this._postService.errorHandler(error);
      }
    )
  }

  /* CLOSE MODAL */
  closeModal(type){
    if (type == 'create'){
      this.createModal = false;
    }else if(type == 'edit'){
      this.editModal = false;
    }else{
      this.deleteModal = false;
    }
  }
}
