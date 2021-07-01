import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PrinterLog } from "./printer-log.entity";

@Entity()
export class PrinterErrorCode {

    @IsNumber()
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @IsNumber()
    @ApiProperty()
    @Column({ unique: true })
    code: number;

    @IsString()
    @ApiProperty()
    @Column({ unique: true })
    detail: string;

    @OneToMany(
        type => PrinterLog,
        printerLog => printerLog.errorCode
    )
    logs: PrinterLog[];
}