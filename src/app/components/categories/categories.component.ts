import { Component, OnInit } from '@angular/core';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  public status;
  public catsArte = [];
  public catsProg = [];
  public catsRecetas = [];

  constructor(
    private _postService : PostService
  ) {
      this.getCategories();
   }

  ngOnInit(): void {

  }

  getCategories(){
    this._postService.getCategories().subscribe(
      response =>{
        this.status = true;
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
       })

      },
      error =>{

      }
    )
  }

}
