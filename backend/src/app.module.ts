/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common' ;
import { TypeOrmModule } from '@nestjs/typeorm' ;
import { NotesModule } from './notes/notes.module';
import { Note } from './notes/note.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // DB type
      host: 'localhost',
      port: 5432,
      username: 'postgres', // db user
      password: 'postgres', // db password
      database: 'notes', // db name
      entities: [Note], // db entities
      synchronize: true, 
    }),
    NotesModule,
  ],
})
export class AppModule {}
