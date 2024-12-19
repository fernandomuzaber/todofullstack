import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-list',
  imports: [CommonModule, FormsModule] ,
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit{
  notes: Note[] = [];
  archivedNotes: Note[] = [];
  filterCategory : string = '';
  selectedNote: Note | null = null;

  constructor (private noteService: NoteService) {}

  ngOnInit(): void {
    this.loadNotes(); //Load notes when the component is initialized
  }

  addNote(newNote: Note) : void {
    const index = this.notes.findIndex((note) => note.id === newNote.id);
    if (index !== -1) {
      //If the note does exist, update it
      this.notes[index] = newNote;
    }else{
      //If not add to beggining of the list
      console.log('ver si es la nueva nota esto o es el evento', newNote);
      this.notes.unshift(newNote)  // Added the new note to the beginning of the list
    }
  };
  
  loadNotes(): void {
    this.noteService.getActiveNotes().subscribe({
      next: (data) => {
        this.notes = data;
      },
      error: (error) => {
        console.error('Error loading notes:', error);
      },
    });

    this.noteService.getArchivedNotes().subscribe({
      next: (data) => {
        this.archivedNotes = data;
      },
      error: (error) => 
        console.error('Error loading archived notes:', error),
      });
  }
  
  editNote(note:Note): void {
    this.selectedNote = note;
  }

  archiveNote(note:Note): void {
    this.noteService.updateNote(note.id, {archived:true}).subscribe({
      next: (updatedNote) => {
        this.notes = this.notes.filter((n) => n.id !== note.id);
        this.archivedNotes.unshift(updatedNote);
      },
      error: (error) => console.error('Error archiving note:', error),
    });
  }

  unarchiveNote(note: Note) : void {
    this.noteService.updateNote(note.id, {archived:false}).subscribe({
      next: (updatedNote) => {
        this.archivedNotes = this.archivedNotes.filter((n) => n.id !== note.id);
        this.notes.unshift(updatedNote);
      },
      error: (error) => console.error('Error unarchiving note:', error),
    });
  }

  filterNotesByCategory(): void {
    if(this.filterCategory) {
      this.noteService.getNotesByCategory(this.filterCategory).subscribe({
        next: (data: Note[]) => {
          this.notes = data;
        },
        error: (error: any) => {
          console.error('Error filtering notes by category:', error);
        },
      });
    }else{
      this.loadNotes();
    }
  }

  deleteNote(note: Note): void{
    if(confirm(`Are you sure you want to delete the note ${note.title}`)){
      this.noteService.deleteNote(note.id).subscribe({
        next: () => {
          //Remove note from the local list
          this.notes = this.notes.filter((n) => n.id !== note.id);
          this.archivedNotes = this.archivedNotes.filter((n) => n.id !== note.id);
          
        },
        error: (error) => console.error('Error deleting note:', error),
      })
    }
  }
}