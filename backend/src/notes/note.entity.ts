/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm' ;

@Entity()   //Class decorator for entities
export class Note {
    @PrimaryGeneratedColumn()  //Automatic ID
    id: number;

    @Column()  //Simple Column
    title: string;

    @Column({ nullable: true }) //Nulls allowed
    content: string;

    @Column({ default:false }) //Default value
    archived: boolean;

    @Column({ type: 'simple-array', nullable:true }) //Array for categories
    categories: string[];
}