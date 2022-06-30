import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationService } from 'app/services/notification.service';

export interface Notification {
  building: string;
  room: string;
  datetime: string;
  reason: string;
  count: number;
}

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

  displayedColumns: string[] = ['build', 'room', 'datetime', 'reason', 'count'];
  dataSource = new MatTableDataSource<Notification>();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue.trim());
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private notificationService: NotificationService
  ) {
  }


  ngOnInit(): void {
    this.buildings.disable();
    this.range.disable();
    this.getHistory()
  }

  private getHistory(){
    this.notificationService.getHistory().subscribe((resp:any) => {
      this.dataSource = new MatTableDataSource<Notification>(resp);
    })
  }

}
