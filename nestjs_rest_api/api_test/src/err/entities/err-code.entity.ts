import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Err } from "./err.entity";

@Entity()
export class ErrCode {

    @ApiPropertyOptional()
    @IsNumber()
    @PrimaryGeneratedColumn()
    id:number;

    @ApiProperty()
    @IsNumber()
    @Column()
    code: number;

    @ApiProperty()
    @IsString()
    @Column()
    name: string;

    @OneToMany(
        type => Err,
        err => err.errCode
    )
    errs: Error[];
}