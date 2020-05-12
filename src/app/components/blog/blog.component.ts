import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  public title;
  public filter;
  public value;

  constructor(
      private _route : ActivatedRoute
  ) { 
   
  }

  ngOnInit(){
    this._route.params.subscribe(params =>{
      this.filter = params['filter'];
      this.value = params['value'];

      this.title = this.value;
    });
  }


}
