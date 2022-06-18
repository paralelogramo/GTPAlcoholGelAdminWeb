import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit  {

  buildings = new FormControl('');

  buildingList: string[] = ['Bienestar Est.', 'Decanato', 'Laboratorios', 'Serv. Multiples', 'Mecánica', 'Biblioteca'];

  constructor() {
  }


  ngOnInit(): void {
  }

}
