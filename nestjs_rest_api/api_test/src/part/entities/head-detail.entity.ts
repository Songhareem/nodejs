import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Part } from "./part.entity";

@Entity()
export class HeadDetail {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiPropertyOptional()
    @Column({type: 'int', nullable: true, default: null})
    no: number;

    @ApiProperty({description: "voltA: 21.5 voltB: 22.1 voltC: 21.6 voltD: 23.1"})
    @Column({type: 'varchar'})
    volts: string;

    @ApiProperty()
    @Column({type: 'decimal', precision: 5, scale: 1})
    temp: number;

    @ApiProperty()
    @Column({type: 'varchar'})
    waveform: string;

    @ManyToOne(
        type => Part,
        part => part.headDetails
    )
    part: Part;
}