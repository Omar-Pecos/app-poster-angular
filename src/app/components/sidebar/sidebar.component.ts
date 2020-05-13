import { Component,OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit ,OnChanges{

  @Input() logued;
  public displayCreate = false;
  constructor() { 
  }

  ngOnInit(): void {
    if (this.logued){
      this.displayCreate = true;
    }
  }

  ngOnChanges(changes : SimpleChanges){
   /* console.log("changes!!");
    console.log(changes.logued);*/

    if (changes.logued.currentValue == true){
      this.displayCreate = true
    }else{
      this.displayCreate = false;
    }
  }


}
