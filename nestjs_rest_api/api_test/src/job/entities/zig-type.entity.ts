import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "./job.entity";

@Entity()
export class ZigType {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({name: 'zig type name'})
    @Column({type: 'varchar', length: 20})
    @IsString()
    name: string;

    @OneToMany(
        type => Job,
        job => job.zigType
    )
    jobs: Job[];
}