import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'app/services/notification.service';

declare var $: any;

export interface Notification {
  building: string;
  room: string;
  reason: string;
  count: number;
}

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

  displayedColumns: string[] = ['building', 'room', 'reason', 'count', 'actions'];
  dataSource = new MatTableDataSource<Notification>();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private notificationService: NotificationService
  ) { }

  showNotification(from, align, room, action) {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    const color = 2; // Enviar notificacion y si no se pudo eliminar tirar el danger
    let message = '';

    if (action == 'repair') {
      message = room + ' Reparada con éxito!';
    }
    else {
      message = 'Dispensador de Alcohol Gel de ' + room + ' Recargado con éxito!';
    }

    $.notify({
      icon: "notifications",
      message: message

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
    // this.buildings.disable();
    // this.range.disable();
    this.notificationService.getNotifications().subscribe((resp: Notification[]) => {
      this.dataSource = new MatTableDataSource<Notification>(resp);
    })
  }

}
