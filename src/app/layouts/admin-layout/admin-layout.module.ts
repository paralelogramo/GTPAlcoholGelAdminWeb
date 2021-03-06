import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { HistoryComponent } from 'app/history/history.component';
import { ClassroomsComponent } from '../../classrooms/classrooms.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DialogComponent } from 'app/classrooms/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { QRCodeModule } from 'angularx-qrcode';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CreateroomdialogComponent } from 'app/classrooms/createroomdialog/createroomdialog.component';
import { CreatebuilddialogComponent } from 'app/classrooms/createbuilddialog/createbuilddialog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    RouterModule.forRoot(AdminLayoutRoutes, { useHash: false }),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatGridListModule,
    MatDatepickerModule,
    MatDividerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatTableModule,
    ScrollingModule,
    MatDialogModule,
    QRCodeModule,
    MatSnackBarModule
  ],
  declarations: [
    DashboardComponent,
    TableListComponent,
    HistoryComponent,
    ClassroomsComponent,
    DialogComponent,
    CreateroomdialogComponent,
    CreatebuilddialogComponent,
  ]
})

export class AdminLayoutModule { }
