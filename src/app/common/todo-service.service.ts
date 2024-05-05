import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { TASK } from '../store/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {
  private readonly url: string = 'http://localhost:3000/posts'

  constructor(private http: HttpClient) { }

  public getToDoList(): Observable<TASK[]> {
    return this.http.get<TASK[]>(this.url);
  }

  public createTask(req: TASK): Observable<TASK[]> {
    return this.http.post<TASK[]>(this.url, req);
  }

  public deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  public editTask(id: number, reqBody: TASK): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, reqBody);
  }

}
