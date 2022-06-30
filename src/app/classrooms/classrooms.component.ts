import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'app/services/notification.service';
import { DialogComponent } from './dialog/dialog.component';

export interface Build {
  building_name: string,
  building_nick: string
}

export interface Room {
  room_name: string
}

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.css']
})
export class ClassroomsComponent implements OnInit {

  clickedRow: any = null;

  displayedColumnsBuilds: string[] = ['building_name', 'actions']
  dataSourceBuilds = new MatTableDataSource<Build>();

  displayedColumnsRooms: string[] = ['room_name', 'actions']
  dataSourceRooms= new MatTableDataSource<Room>();

  applyFilterBuilds(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceBuilds.filter = filterValue.trim().toLowerCase();
  }

  applyFilterRooms(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceRooms.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private notificationService: NotificationService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getBuilds()
  }

  rowClick($event){
    this.getRoomsOfBuild($event.building_id)
  }

  getBuilds(){
    this.notificationService.getBuilds().subscribe((resp:any) => {
      this.dataSourceBuilds = new MatTableDataSource<Build>(resp)
    })
  }

  getRoomsOfBuild(id: string){
    this.notificationService.getRooms(id).subscribe((resp: any) => {
      this.dataSourceRooms = new MatTableDataSource<Room>(resp)
    })
  }

  showQR(url: any) {
    const completeURL = 'http://alcoholgel.sytes.net:81/notification/' + url.room_name.replace(' ', '%20')
    const data = {
      url: completeURL,
      name: url.room_name
    }
    const dialogo1 = this.dialog.open(DialogComponent, {
      data: data
    });
  }
}
