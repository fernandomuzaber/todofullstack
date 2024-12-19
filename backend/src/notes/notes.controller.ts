/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common' ;
import { NotesService } from './notes.service';
import { Note } from './note.entity';

@Controller('notes') // /notes
export class NotesController {
    constructor(private readonly notesService: NotesService) {}


    //POST NEW NOTE

    // POST /notes
    @Post()

    create(@Body() noteBody: Partial<Note>): Promise<Note> {
        return this.notesService.create(noteBody);
    }

    //GET ALL NOTES

    @Get()
    findAll(): Promise<Note[]> {
        return this.notesService.findAll();
    }
    
    //GET ALL ACTIVE NOTES

    // GET /notes/active

    @Get('active')
    findActiveNotes(): Promise<Note[]> {
        return this.notesService.findActiveNotes();
    }

    //GET ALL ARCHIVED NOTES

    // GET /notes/archived

    @Get('archived')
    findArchivedNotes(): Promise<Note[]> {
        return this.notesService.findArchivedNotes();
    }

    @Get('filter')
    findNotesByCategory(@Query('category') category:string) : Promise<Note[]> {
        return this.notesService.findNotesByCategory(category);
    }

    //UPDATE NOTE BY ID

    //PATCH /notes/:id

    @Patch(':id')
    update(@Param('id') id:number, @Body() updatedFields: Partial<Note>): Promise<Note> {
        return this.notesService.update(id, updatedFields);
    }

    //DELETE NOTE BY ID

    //DELETE /notes/:id
    
    @Delete(':id')
    delete(@Param('id') id:number) : Promise<void> {
        return this.notesService.delete(id);
    }
}
