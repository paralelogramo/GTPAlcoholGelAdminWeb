import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'app/services/notification.service';

@Component({
  selector: 'app-createbuilddialog',
  templateUrl: './createbuilddialog.component.html',
  styleUrls: ['./createbuilddialog.component.css']
})
export class CreatebuilddialogComponent implements OnInit {

  dialogType: string = this.data.type;

  // Dialog Data
  headText: string = ''
  headSubText: string = ''
  buttonText: string = ''

  color:string = 'accent';

  form = new FormGroup({
    name: new FormControl(''),
    nick: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<CreatebuilddialogComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.data.type == 'edit') {
      this.headText = 'Editar Edificio'
      this.headSubText = 'Acá puedes editar un edificio.'
      this.buttonText = 'Guardar'
      this.form.setValue({name: this.data.info.building_name, nick: this.data.info.building_nick})
    } else {
      this.headText = 'Crear Edificio'
      this.headSubText = 'Acá puedes crear un edificio nuevo.'
      this.buttonText = 'Agregar'
    }
  }

  middleAction(){
    const name = this.form.get('name')?.value;
    const nick = this.form.get('nick')?.value;
    if(!name || !nick){
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
    const id = this.data.info.building_id;
    const name = this.form.get('name')?.value;
    const nick = this.form.get('nick')?.value;
    this.notificationService.editBuilding(id, name, nick).subscribe((resp: any) => {
      if (resp){
        this.dialogRef.close({resp: 'se'})
      }
    },
    error => {

    })
  }

  add(){
    const name = this.form.get('name')?.value;
    const nick = this.form.get('nick')?.value;
    this.notificationService.postBuilding(name, nick).subscribe((resp: any) => {
      if (resp){
        this.dialogRef.close({resp: 'sa'})
      }
    },
    error => {
      console.log(error)
    })
  }

}
