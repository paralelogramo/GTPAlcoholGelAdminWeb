import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl = 'http://alcoholgel.sytes.net:3000';

  constructor(private notificationHttp: HttpClient) { }

  // --- START GET LIST ---
  getTotalRooms(){ return this.notificationHttp.get(this.baseUrl + '/getTotalRooms')}
  getNotifiedRooms(){ return this.notificationHttp.get(this.baseUrl + '/getNotifiedRooms')}
  getMostNotifiedRoom(){ return this.notificationHttp.get(this.baseUrl + '/getMostNotifiedRoom')}
  getCountOfRR(){ return this.notificationHttp.get(this.baseUrl + '/getCountOfRR')}
  getNotifications(){ return this.notificationHttp.get(this.baseUrl + '/getNotifications') }
  getRooms(id: string){ return this.notificationHttp.get(this.baseUrl + '/getRooms?building_id=' + id) }
  getBuilds(){ return this.notificationHttp.get(this.baseUrl + '/getBuilds') }
  getBuildsName(){ return this.notificationHttp.get(this.baseUrl + '/getBuildsName') }
  getHistory(){ return this.notificationHttp.get(this.baseUrl + '/getHistory') }
  getUser(email: string){ return this.notificationHttp.get(this.baseUrl + '/getUser?email=' + email)}
  // --- END GET LIST ---

}
