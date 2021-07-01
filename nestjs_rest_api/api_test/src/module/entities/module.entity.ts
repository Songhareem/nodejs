import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Part } from "src/part/entities/part.entity";
import { Vender } from "src/vender/entities/vender.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Module {
    @ApiPropertyOptional()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({type: 'varchar', length:100})
    partNo: string; 

    @ApiPropertyOptional()
    @Column({type: 'int', nullable: true, default: null})
    lifespan: number;

    @ManyToOne(
        type => Vender,
        vender => vender.modules
    )
    vender: Vender

    @OneToMany(
        type => Part,
        part => part.module
    )
    parts: Part[];
}