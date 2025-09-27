import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from '../app/activity.model';


@Injectable({ providedIn: 'root' })
export class TareaService {
  private apiUrl = 'http://localhost:3000/api/tareas';


  private base = '/api/tareas'; // Ajusta este endpoint según tu backend

  constructor(private http: HttpClient) {}

  list(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.apiUrl);
  }

  get(id: number): Observable<Activity> {
    return this.http.get<Activity>(`${this.apiUrl}/${id}`);
  }

  create(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(this.apiUrl, activity);
  }

  update(id: number, activity: Activity): Observable<Activity> {
    return this.http.put<Activity>(`${this.apiUrl}/${id}`, activity);
  }

  patch(id: number, partial: Partial<Activity>): Observable<Activity> {
    return this.http.patch<Activity>(`${this.apiUrl}/${id}`, partial);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
