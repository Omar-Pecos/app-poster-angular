import { Component,OnInit, Input, DoCheck } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit ,DoCheck{

  @Input() logued;
  public displayCreate = false;
  
  constructor(
    private _router : Router
  ) { 
  }

  ngOnInit(): void {
    if (this.logued == true){
      this.displayCreate = true;
    }else{
      this.displayCreate = false;
    }
  }
  
ngDoCheck(){
  if (this.logued == true){
    this.displayCreate = true;
  }else{
    this.displayCreate = false;
  }
}

onSubmit(form : NgForm){
  let data = form.value;
  //console.log(data.search);
  
  this._router.navigate(['/buscar/'+data.search]);
}
  

 /* ngOnChanges(changes : SimpleChanges){
    console.log(changes);
   /* console.log("changes!!");
    

    if (changes.logued.currentValue === true){
      this.displayCreate = true;
    }else{
      this.displayCreate = false;
    }

    if (changes.logued.currentValue != changes.logued.previousValue){
      if (changes.logued.currentValue == true){
        this.displayCreate = true;
      }else{
        this.displayCreate = false;
      }
    }
  }*/


}
