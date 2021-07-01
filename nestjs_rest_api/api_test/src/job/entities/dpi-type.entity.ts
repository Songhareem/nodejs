import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "./job.entity";

@Entity()
export class DpiType {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({name: 'dpi x'})
    @Column({type: 'int'})
    @IsString()
    x: number;

    @ApiProperty({name: 'dpi y'})
    @Column({type: 'int'})
    @IsString()
    y: number;

    @OneToMany(
        type => Job,
        job => job.garmentType
    )
    jobs: Job[];
}