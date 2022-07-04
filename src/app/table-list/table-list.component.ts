import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationService } from 'app/services/notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

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

  pipe = new DatePipe('en-US');

  clickedRow: any = null;
  
  buildings = new FormControl('');

  buildingList: string[] = [] // alimentar con la db

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
    private notificationService: NotificationService,
    private snackBar: MatSnackBar
  ) { }

  rowClick($event){
    this.clickedRow = $event;
  }
  
  showNotification( room ) {
    this.notificationService.getRoomByName(room.room).subscribe((resp: any) => {
      this.notificationService.postRR(room.building, room.room, this.pipe.transform(Date.now(), 'dd/MM/yyyy'), this.pipe.transform(Date.now(), 'hh:mm:ss'), room.reason, room.count, resp.room_id).subscribe((resp: any) => {
        if (resp.confirm) {
          if (room.reason == 'Alcohol Gel') {
            this.snackBar.open(
              "Dispensador de alcohol gel " + room.room + ' recargado con éxito!',
              null,
              {
                duration: 5000
              });
          }
          else {
            this.snackBar.open(
              room.room + 'reparado con éxito!',
              null,
              {
                duration: 5000
              });
          }
          this.getNotifications();
        } else {
          this.snackBar.open(
            "Ups! Al parecer hubo un problema, inténtalo de nuevo!",
            null,
            {
              duration: 5000
            });
        }
      },
      error => {
        this.snackBar.open(
          "Ups! Al parecer hubo un problema, inténtalo de nuevo!",
          null,
          {
            duration: 5000
          });
      })
    },
    error => {
      this.snackBar.open(
        "Ups! Al parecer hubo un problema, inténtalo de nuevo!",
        null,
        {
          duration: 5000
        });
    })
  }
  ngOnInit() {
    this.buildings.disable();
    this.range.disable();
    this.getBuildsNames();
    this.getNotifications();
    // let todayWithPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy hh:mm:ss');
  }

  private getBuildsNames(){
    this.notificationService.getBuildsName().subscribe((resp:any) => {
      resp.forEach(obj => {
        this.buildingList.push(obj.name)
      });
    })
  }

  private getNotifications(){
    this.notificationService.getNotifications().subscribe((resp: Notification[]) => {
      this.dataSource = new MatTableDataSource<Notification>(resp);
    })
  }
}
