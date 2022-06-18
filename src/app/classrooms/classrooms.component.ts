import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.scss']
})
export class ClassroomsComponent implements OnInit {

  mode: String = 'Card';

  changeMode() {
    console.log('Cambio')
    if (this.mode == 'Card'){
      this.mode = 'List';
    }
    else{
      this.mode = 'Card';
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
