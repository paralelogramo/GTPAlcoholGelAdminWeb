import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  getRoomByName(name: string){ return this.notificationHttp.get(this.baseUrl + '/getRoomByName?room_name=' + name) }
  getBuilds(){ return this.notificationHttp.get(this.baseUrl + '/getBuilds') }
  getBuildsName(){ return this.notificationHttp.get(this.baseUrl + '/getBuildsName') }
  getHistory(){ return this.notificationHttp.get(this.baseUrl + '/getHistory') }
  getUser(email: string){ return this.notificationHttp.get(this.baseUrl + '/getUser?email=' + email)}
  // --- END GET LIST ---

  // --- START POST LIST ---
  postBuilding(name: string, nick: string){
    let headers = new HttpHeaders({ "content-type": 'application/x-www-form-urlencoded' });
    headers.append('Access-Control-Allow-Origin', "*");
    let body = new URLSearchParams();
    body.set('name', name);
    body.set('nick', nick);
    return this.notificationHttp.post(this.baseUrl + '/postBuilding', body.toString(), {headers: headers})
  }

  postRoom(name: string, capacity: string, refBuild: string){
    let headers = new HttpHeaders({ "content-type": 'application/x-www-form-urlencoded' });
    headers.append('Access-Control-Allow-Origin', "*");
    let body = new URLSearchParams();
    body.set('name', name);
    body.set('capacity', capacity);
    body.set('refBuild', refBuild);
    return this.notificationHttp.post(this.baseUrl + '/postRoom', body.toString(), {headers: headers})
  }

  postRR(build: string, room: string, date: string, time: string, reason: string, count: string, room_id: string){
    let headers = new HttpHeaders({ "content-type": 'application/x-www-form-urlencoded' });
    headers.append('Access-Control-Allow-Origin', "*");
    let body = new URLSearchParams();
    body.set('build', build);
    body.set('room', room);
    body.set('date', date);
    body.set('time', time);
    body.set('reason', reason);
    body.set('count', count);
    body.set('room_id', room_id);
    return this.notificationHttp.post(this.baseUrl + '/postRR', body.toString(), {headers: headers})
  }
  // --- END POST LIST ---

  // --- START PATCH LIST ---
  editBuilding(id: string, name: string, nick: string){
    let headers = new HttpHeaders({ "content-type": 'application/x-www-form-urlencoded' });
    headers.append('Access-Control-Allow-Origin', "*");
    let body = new URLSearchParams();
    body.set('id', ''+id);
    body.set('name',name);
    body.set('nick', nick);
    return this.notificationHttp.patch(this.baseUrl + '/editBuilding', body.toString(), {headers: headers})
  }

  editRoom(id: string, name: string, capacity: string, refBuild: string){
    let headers = new HttpHeaders({ "content-type": 'application/x-www-form-urlencoded' });
    headers.append('Access-Control-Allow-Origin', "*");
    let body = new URLSearchParams();
    body.set('id', ''+id);
    body.set('name',name);
    body.set('capacity', capacity);
    body.set('refBuild', refBuild);
    return this.notificationHttp.patch(this.baseUrl + '/editRoom', body.toString(), {headers: headers})
  }
  // --- END PATCH LIST

  // --- START DELETE LIST ---
  deleteBuilding(id: string){
    return this.notificationHttp.delete(this.baseUrl + '/deleteBuilding?id=' + id)
  }

  deleteRoom(id: string){
    return this.notificationHttp.delete(this.baseUrl + '/deleteRoom?id=' + id)
  }
  // --- END DELETE LIST ---
}
