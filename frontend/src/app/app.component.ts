import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NoteService } from './services/note.service'
import { Note } from './models/note.model'
import { CommonModule } from '@angular/common';
import { NoteFormComponent } from './components/note-form/note-form.component';
import { NoteListComponent } from "./components/note-list/note-list.component";


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    NoteFormComponent,
    NoteListComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [NoteService]
})

export class AppComponent{
  title = 'frontend';
  notes: Note[] = [];
  
  constructor(private noteService: NoteService){}

  ngOnInit():void {
    this.loadNotes();
  }

  async loadNotes(): Promise<void> {
    this.noteService.getActiveNotes().subscribe(
      (notes: Note[]) => {
        this.notes = notes;
      },
      (error: any) => {
        console.error('Error loading notes:', error);
      }
    );
  }
  
}
