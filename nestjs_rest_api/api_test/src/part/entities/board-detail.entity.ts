import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Part } from "./part.entity";

@Entity()
export class BoardDetail {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({type: 'varchar', length: 10})
    firmwareVersion: string;

    @ApiProperty()
    @Column({type: 'varchar', length: 10})
    boardVersion: string;

    @ApiProperty()
    @Column({type: 'decimal', precision: 5, scale: 1})
    temp: number;

    @ManyToOne(
        type => Part,
        part => part.boardDetails
    )
    part: Part;
}