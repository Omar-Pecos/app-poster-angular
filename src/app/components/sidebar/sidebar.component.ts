import { Component,OnInit, OnChanges, Input, DoCheck } from '@angular/core';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit ,DoCheck{

  @Input() logued;
  public displayCreate = false;
  constructor() { 
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
