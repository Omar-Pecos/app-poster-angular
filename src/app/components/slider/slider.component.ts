import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() title;
  @Input() size;
  
  constructor() { }

  ngOnInit(): void {
  }

}
