import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/services/notification.service';
import {Md5} from 'ts-md5/dist/md5';

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Estadisticas',  icon: 'dashboard', class: '' },
    { path: '/notifications', title: 'Notificaciones',  icon:'content_paste', class: '' },
    { path: '/classrooms', title: 'Salas',  icon:'meeting_room', class: '' },
    { path: '/history', title: 'Historial',  icon:'history', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  imgURL: string = ''
  username: string = ''
  lastname: string = ''

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.getUser()
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  private getUser(){
    this.notificationService.getUser(Md5.hashStr("msaez@utalca.cl")).subscribe((resp: any) => {
      this.imgURL = resp.url
      this.username = resp.name
      this.lastname = resp.lastname
    })
  }
}
