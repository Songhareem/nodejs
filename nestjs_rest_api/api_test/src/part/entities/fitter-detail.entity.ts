import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Part } from "./part.entity";

@Entity()
export class FilterDetail {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({description: "0: another / 1: uv"})
    @Column({type: 'int', nullable: true, default: null})
    filterType: number;

    @ManyToOne(
        type => Part,
        part => part.filterDetails
    )
    part: Part;
}