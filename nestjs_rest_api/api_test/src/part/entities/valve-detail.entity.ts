import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Part } from "./part.entity";

@Entity()
export class ValveDetail {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        type => Part,
        part => part.valveDetails
    )
    part: Part;
}