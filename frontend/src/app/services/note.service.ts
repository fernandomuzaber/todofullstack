import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private api = `${environment.apiUrl}`;
  
  constructor(private http: HttpClient) {
   }

  //Get notes
  
  getActiveNotes(): Observable<Note[]>{
    return this.http.get<Note[]>(`${this.api}/notes/active`); 
  }

  getArchivedNotes(): Observable<Note[]>{
    return this.http.get<Note[]>(`${this.api}/notes/archived`); 
  }

  getNotesByCategory(category:string): Observable<Note[]>{
    return this.http.get<Note[]>(`${this.api}/notes/filter?category=${category}`); 
  }

  //CREATE NOTE
  createNote(note: Note): Observable<Note>{
    return this.http.post<Note>(`${this.api}/notes`, note);
  }

  //UPDATE NOTE
  updateNote(id: number, updatedFields: Partial<Note>): Observable<Note>{
    return this.http.patch<Note>(`${this.api}/notes/${id}`, updatedFields);
  }

  //DELETE NOTE
  deleteNote(id:number): Observable<void>{
    return this.http.delete<void>(`${this.api}/notes/${id}`);
  }
}
