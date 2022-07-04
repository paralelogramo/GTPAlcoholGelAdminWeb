import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'app/services/notification.service';

@Component({
  selector: 'app-createroomdialog',
  templateUrl: './createroomdialog.component.html',
  styleUrls: ['./createroomdialog.component.css']
})
export class CreateroomdialogComponent implements OnInit {

  dialogType: string = this.data.type;

  // Dialog Data
  headText: string = ''
  headSubText: string = ''
  buttonText: string = ''

  form = new FormGroup({
    refBuild: new FormControl(''),
    name: new FormControl(''),
    capacity: new FormControl(0)
  });

  constructor(
    public dialogRef: MatDialogRef<CreateroomdialogComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    if (this.data.type == 'edit') {
      this.headText = 'Editar Sala'
      this.headSubText = 'Acá puedes editar una sala.'
      this.buttonText = 'Guardar'
      let build = this.data.buildingList.find(i => i.building_id == this.data.info.ref_building);
      this.form.setValue({refBuild: build.building_name, name:this.data.info.room_name, capacity: this.data.info.room_capacity})
    } else {
      this.headText = 'Crear Sala'
      this.headSubText = 'Acá puedes crear una sala nueva.'
      this.buttonText = 'Agregar'
    }
  }

  middleAction(){
    const room_name = this.form.get('name').value;
    const room_capacity = this.form.get('capacity').value;
    const build_name = this.form.get('refBuild').value;
    if(!room_name || !room_capacity || !build_name){
      this.snackBar.open(
        "Debes rellenar los campos obligatorios!",
        null,
        {
          duration: 5000
        });
    }
    else{
      if (this.data.type == 'edit') {
        this.edit();
      } else {
        this.add();
      }
    }
  }

  edit(){
    const room_id = this.data.info.room_id
    const room_name = this.form.get('name').value;
    const room_capacity = this.form.get('capacity').value;
    const build_name = this.form.get('refBuild').value;
    let build = this.data.buildingList.find(i => i.building_name == build_name)
    this.notificationService.editRoom(room_id, room_name, room_capacity, build.building_id).subscribe((resp: any) => {
      if (resp.confirm){
        this.dialogRef.close({resp: 'se'})
      }
      else {
        this.dialogRef.close({resp: 'error'})
      }
    },
    error => {
      this.dialogRef.close({resp: 'error'})
    })
  }

  add(){
    let build = this.data.buildingList.find(i => i.building_name == this.form.get('refBuild').value)
    const name = this.form.get('name')?.value;
    const capacity = this.form.get('capacity')?.value;
    this.notificationService.postRoom(name, capacity, build.building_id).subscribe((resp: any) => {
      if (resp){
        this.dialogRef.close({resp: 'sa', build: build})
      }
      else {
        this.dialogRef.close({resp: 'error'})
      }
    },
    error => {
      this.dialogRef.close({resp: 'error'})
    })
  }
}
