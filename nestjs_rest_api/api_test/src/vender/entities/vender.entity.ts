import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Module } from "../../module/entities/module.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vender {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({name: 'vender name'})
    @Column({type: 'varchar', length: 20})
    @IsString()
    name: string;

    @ApiProperty({name: 'vender link', nullable: true, default: null})
    @Column({type: 'varchar', nullable: true, default: null})
    @IsString()
    link: string;

    @OneToMany(
        type => Module,
        module => module.vender
    )
    modules: Module[];
}