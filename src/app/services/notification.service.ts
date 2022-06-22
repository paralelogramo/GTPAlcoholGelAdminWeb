import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl = 'alcoholgel.sytes.net';
  private port = '3000';

  constructor(private notificationHttp: HttpClient) { }

  getNotification() {
    // Get all the notifications of the database
    return this.notificationHttp.get(this.baseUrl + ':' + this.port + '/getNotifications');
  }

  getHistory() {
    // Get all records of the history of the database (different of the notifications)
    // they are saved on another table
    return this.notificationHttp.get(this.baseUrl + ':' + this.port + '/getHistory');
  }

  sendRR(room: string) {
    // Send the selected action of the notification view. Its the same action between Repair and Recharge
    // but the botton is different
    return this.notificationHttp.post(this.baseUrl + ':' + this.port + '/postRR', room);
  }

}
