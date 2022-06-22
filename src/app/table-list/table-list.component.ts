import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

declare var $: any;

export interface Notification {
  building: string;
  room: string;
  date: string;
  reason: string;
}

const ELEMENT_DATA: Notification[] = [
  { building: 'Bienestar Est.', room: 'Sala S2', date: '6/15/19, 5:24 PM', reason: 'Alcohol Gel' },
  { building: 'Serv. Multiples', room: 'Sala 21', date: '6/15/19, 5:24 PM', reason: 'Reparacion' },
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
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  buildings = new FormControl('');

  buildingList: string[] = ['Bienestar Est.', 'Decanato', 'Laboratorios', 'Serv. Multiples', 'Mecánica', 'Biblioteca'];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  displayedColumns: string[] = ['building', 'room', 'date', 'reason', 'actions'];
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

  constructor() { }
  showNotification(from, align) {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    const color = 2; // Enviar notificacion y si no se pudo eliminar tirar el danger

    $.notify({
      icon: "notifications",
      message: "Dispensador de alcohol gel recargado con exito"

    }, {
      type: type[color],
      timer: 4000,
      placement: {
        from: from,
        align: align
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }
  ngOnInit() {
    this.buildings.disable();
    this.range.disable();
  }

}
