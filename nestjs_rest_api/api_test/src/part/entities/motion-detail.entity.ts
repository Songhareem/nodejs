import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Part } from "./part.entity";

@Entity()
export class MotionDetail {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiPropertyOptional()
    @Column({type: 'int', nullable: true, default: null})
    no: number;

    @ManyToOne(
        type => Part,
        part => part.motionDetails
    )
    part: Part;
}