import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'app/services/notification.service';
import { DialogComponent } from './dialog/dialog.component';
import { CreatebuilddialogComponent } from './createbuilddialog/createbuilddialog.component';
import { CreateroomdialogComponent } from './createroomdialog/createroomdialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Build {
  building_id: string,
  building_name: string,
  building_nick: string
}

export interface Room {
  room_name: string
}

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.css'],
})
export class ClassroomsComponent implements OnInit {

  clickedRow: any = null;
  clickedRowRoom: any = null;

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
    public dialog: MatDialog,
    public dialog2: MatDialog,
    public dialog3: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getBuilds()
  }

  rowClick($event){
    this.getRoomsOfBuild($event.building_id)
    this.clickedRow = $event
  }

  rowClickRoom($event){
    this.clickedRowRoom = $event
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
    const dialog = this.dialog.open(DialogComponent, {
      data: data,
    });
  }

  showBuild(type: string, building?: any){
    const dialog = this.dialog2.open(CreatebuilddialogComponent, {
      data: {
        type: type,
        info: building
      },
    });
    
    dialog.afterClosed().subscribe((data:any) => {
      if (data != undefined) {
        if (data.resp == 'sa') {
          this.snackBar.open(
            "Edificio creado con éxito!",
            null,
            {
              duration: 5000
            });
          this.getBuilds();
        }
        if (data.resp == 'se') {
          this.snackBar.open(
            "Edificio editado con éxito!",
            null,
            {
              duration: 5000
            });
          this.getBuilds();
        }
        if (data.resp == 'error'){
          const openSnackBar = this.snackBar.open(
            "Ups! Hubo un problema intenta más tarde",
            null,
            {
              duration: 5000
            }
          );
        }
      }
    })
  }

  showRoom(type: string, room?: any){
    const dialog = this.dialog3.open(CreateroomdialogComponent, {
      data: {
        type: type,
        info: room,
        buildingList: this.dataSourceBuilds.data
      }
    });

    dialog.afterClosed().subscribe((data:any) => {
      if(data != undefined){
        if (data.resp == 'sa') {
          this.clickedRow = data.build;
          const openSnackBar = this.snackBar.open(
            "Se agregó correctamente la sala!",
            null,
            {
              duration: 5000
            }
          );
        this.getRoomsOfBuild(this.clickedRow.building_id)
        }
        if (data.resp == 'se') {
          const openSnackBar = this.snackBar.open(
            "Se editó correctamente la sala!",
            null,
            {
              duration: 5000
            }
          );
        this.getRoomsOfBuild(this.clickedRow.building_id)
        }
        if (data.resp == 'error'){
          const openSnackBar = this.snackBar.open(
            "Ups! Hubo un problema intenta más tarde",
            null,
            {
              duration: 5000
            }
          );
        }
      }
    })
  }

  deleteBuild(build: any){
    const openSnackBar = this.snackBar.open(
      "¿Seguro que desea eliminar el edificio " + build.building_name + "?\n Tenga en cuenta que se eliminarán todas las salas de ese edificio.",
      "Si",
      
      {
        duration: 5000,
      }
    );

    openSnackBar.onAction().subscribe((resp: any) => {
      this.notificationService.deleteBuilding(build.building_id).subscribe((resp: any) => {
        if(resp.confirm){
          const openSnackBar = this.snackBar.open(
            "Se eliminó correctamente el edificio!",
            null,
            {
              duration: 5000
            }
          );
          this.dataSourceRooms = new MatTableDataSource<Room>()
          this.getBuilds();
        }
        else{
          const openSnackBar = this.snackBar.open(
            "Ups! hubo un problema al eliminar el edificio",
            null,
            {
              duration: 5000
            }
          );
        }
      })
    });
  }

  deleteRoom(room: any){
    const openSnackBar = this.snackBar.open(
      "¿Seguro que desea eliminar la sala " + room.room_name + "?",
      "Si",
      {
        duration: 5000,
      }
    );

    openSnackBar.onAction().subscribe((resp: any) => {
      this.notificationService.deleteRoom(room.room_id).subscribe((resp: any) => {
        if(resp.confirm){
          const openSnackBar = this.snackBar.open(
            "Se eliminó correctamente el edificio!",
            null,
            {
              duration: 5000
            }
          );
          this.getRoomsOfBuild(room.room_id);
        }
        else{
          const openSnackBar = this.snackBar.open(
            "Ups! hubo un problema al eliminar el edificio",
            null,
            {
              duration: 5000
            }
          );
        }
      })
    });
  }
}
