/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Note } from './note.entity'


@Injectable()
export class NotesService {
    constructor(
        @InjectRepository(Note)
        private noteRepository: Repository<Note>,
    ) {}

    //CRUD Notes

    //CREATE

    async create(note: Partial<Note>): Promise<Note> {
    const newNote = this.noteRepository.create(note);
    return this.noteRepository.save(newNote);
    }

    //READ unarchived notes
    findActiveNotes(): Promise<Note[]> {
        return this.noteRepository.find({where: {archived: false}});
    }

    //READ archived notes
    findArchivedNotes(): Promise<Note[]> {
        return this.noteRepository.find({ where: {archived: true}});
    }

    // Find by category

    async findNotesByCategory(category: string):Promise<Note[]>{
        return this.noteRepository.find({
            where: {
                categories: Like(`%${category}%`), 
            },
        });
    }

    async findAll(): Promise<Note[]> {
        return this.noteRepository.find();
    }

    //UPDATE notes

    async update(id:number, updatedFields: Partial<Note>): Promise<Note> {
        await this.noteRepository.update(id, updatedFields);
        return this.noteRepository.findOne({where: {id}});
    }

    //DELETE Notes

    delete(id:number): Promise<void>{
        return this.noteRepository.delete(id).then(() => undefined);
    }
}
