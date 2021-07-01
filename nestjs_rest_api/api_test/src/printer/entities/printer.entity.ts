import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { CrudReq as Crud } from "src/common/enums/crud-req.enum";
import { Err } from "src/err/entities/err.entity";
import { Job } from "src/job/entities/job.entity";
import { Part } from "src/part/entities/part.entity";
import { Type } from "src/type/entities/type.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PrinterCount } from "./printer-count.entity";
import { PrinterLog } from "./printer-log.entity";
import { PrinterStatus } from "./printer-status.entity";

export enum PrinterKind {
    All = "%",
    Cheetah = "Cheetah",
    Pantera = "Pantera",
    Freejet = "Freejet",
    //Freejet2 = "Freejet2",
    Wasabi = "Wasabi",
    SiD = "SiD",
}

@Entity()
export class Printer {
    @IsNumber()
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @ApiProperty()
    @Column({type: 'varchar', length: 100})
    serialNo: string;

    @IsString()
    @ApiProperty()
    @Column({ select: false })
    password: string;

    @ManyToOne(
        type => Type,
        type => type.printers,
        {onDelete: "SET NULL", nullable: true, lazy: true}
    )
    type: Type

    @OneToMany(
        type => Part,
        part => part.printer
    )
    parts: Part[];

    @OneToMany(
        type => Job,
        job => job.printer
    )
    jobs: Job[];

    @OneToMany(
        type => Err,
        err => err.printer,
    )
    errs: Err[];

    @OneToMany(
        type => PrinterStatus,
        printerStatus => printerStatus.printer
    )
    printerStatuses: PrinterStatus[];

    @OneToMany(
        type => PrinterLog,
        printerLog => printerLog.printer
    )
    logs: PrinterLog[];
}

@Entity()
export class PrinterReq {
    @ApiProperty()
    @IsNumber()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({description: 'If crud is "Update", name="Target-Name,New-Name"'})
    @IsString()
    @Column({type: 'varchar', length: 100})
    serialNo: string;


    @ApiProperty({type: 'enum', enum: Crud})
    @Column({type: 'enum', enum: Crud})
    crud: Crud;

    @ApiPropertyOptional({
        type: Number,
        description: 'if Crud is "Delete", input "null" in this field'
    })
    @Column({type: Number, nullable: true})
    typeId?: number;

    @ManyToOne(
        type => User,
        user => user.printerReqs,
        { onDelete: "CASCADE", nullable: true }
    )
    user: User;
}