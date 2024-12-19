import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.model';


@Component({
  selector: 'app-note-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
})

export class NoteFormComponent implements OnChanges{
  @Input() noteToEdit: Note | null = null;
  @Output() noteCreated = new EventEmitter<Note>();
  @Output() noteAdded = new EventEmitter<Note>();
  noteForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private noteService: NoteService) {
    // Create the form
    this.noteForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: [''], // Optional
      categories: [''],//Optional
    });
  }

  onSubmit():void {
    if (this.noteForm.valid) {
      //Categories to an array
      const formValue = this.noteForm.value;
      const newNote : Note = {
        ...formValue,
        categories: formValue.categories ? formValue.categories.split(',').map((cat: string) => cat.trim()) : [],
      };
      //If exists note to edit
      if (this.noteToEdit) {
        //Call the service to update the note
        this.noteService.updateNote(this.noteToEdit.id, newNote).subscribe({
          next: (updatedNote) => {
            console.log('Note updated: ', updatedNote);
            this.noteToEdit = null; //Exit to edit mode
            this.noteForm.reset();// Clean form
            this.noteCreated.emit(updatedNote); //Emit noteUpdated to parent component
          },
          error: (error) => console.error('Error to updated the note', error),
        });
      }else {
      //Call the service to add the note
        this.noteService.createNote(newNote).subscribe({
          next: (createdNote) => {
            this.noteForm.reset(); // Clean form
            this.noteAdded.emit(createdNote); // Emit newNote to parent component
          },
          error: (error) => {
            console.error('Error creating note', error);
          },
        });
      }
    }
  }
  ngOnChanges(): void {
    if(this.noteToEdit) {
      //If there's a note to edit, it preload the values in the form
      this.noteForm.patchValue({
        title: this.noteToEdit.title,
        content: this.noteToEdit.content,
        categories: this.noteToEdit.categories?.join(','), //Change the array to a String
      })
    }
  }
}
