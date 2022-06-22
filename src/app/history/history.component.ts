import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

export interface Notification {
  building: string;
  room: string;
  date: string;
  reason: string;
}

const ELEMENT_DATA: Notification[] = [
  { building: 'Bienestar Est.', room: 'Sala S2', date: '6/15/19, 5:24 PM', reason: 'Alcohol Gel' },
  { building: 'Serv. Multiples', room: 'Sala 21', date: '6/15/19, 5:24 PM', reason: 'Alcohol Gel' },
  { building: 'Laboratorios', room: 'Telematica', date: '6/15/19, 5:24 PM', reason: 'Alcohol Gel' },
  { building: 'Bienestar Est.', room: 'Sala S2', date: '6/15/19, 5:24 PM', reason: 'Alcohol Gel' },
  { building: 'Serv. Multiples', room: 'Sala 21', date: '6/15/19, 5:24 PM', reason: 'Alcohol Gel' },
  { building: 'Laboratorios', room: 'Telematica', date: '6/15/19, 5:24 PM', reason: 'Alcohol Gel' },
  { building: 'Bienestar Est.', room: 'Sala S2', date: '6/15/19, 5:24 PM', reason: 'Alcohol Gel' },
  { building: 'Serv. Multiples', room: 'Sala 21', date: '6/15/19, 5:24 PM', reason: 'Alcohol Gel' },
  { building: 'Laboratorios', room: 'Telematica', date: '6/15/19, 5:24 PM', reason: 'Alcohol Gel' },
  { building: 'Bienestar Est.', room: 'Sala S2', date: '6/15/19, 5:24 PM', reason: 'Alcohol Gel' },
  { building: 'Serv. Multiples', room: 'Sala 21', date: '6/15/19, 5:24 PM', reason: 'Alcohol Gel' },
  { building: 'Laboratorios', room: 'Telematica', date: '6/15/19, 5:24 PM', reason: 'Alcohol Gel' }
];

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  buildings = new FormControl('');

  buildingList: string[] = ['Bienestar Est.', 'Decanato', 'Laboratorios', 'Serv. Multiples', 'Mecánica', 'Biblioteca'];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  displayedColumns: string[] = ['building', 'room', 'date', 'reason'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue.trim());
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor() {
  }


  ngOnInit(): void {
    this.buildings.disable();
    this.range.disable();
  }

}
