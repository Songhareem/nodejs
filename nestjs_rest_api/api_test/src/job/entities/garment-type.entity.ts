import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "./job.entity";

@Entity()
export class GarmentType {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({name: 'garment type name'})
    @Column({type: 'varchar', length: 20})
    @IsString()
    name: string;

    @OneToMany(
        type => Job,
        job => job.garmentType
    )
    jobs: Job[];
}

@Entity()
export class GarmentColor {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({name: 'garment color name'})
    @Column({type: 'varchar', length: 20})
    @IsString()
    name: string;

    @OneToMany(
        type => Job,
        job => job.garmentColor
    )
    jobs: Job[];
}