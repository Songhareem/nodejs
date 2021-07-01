import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { PrinterErrorCode } from "./printer-error-code.entity";
import { Printer } from "./printer.entity";

@Entity()
export class PrinterLogType {
    @IsNumber()
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @ApiProperty()
    @Column({type: String})
    name: string;

    @OneToMany(
        type => PrinterLog,
        printerLog => printerLog.logType
    )
    logs: PrinterLog[];
}

@Entity()
export class PrinterLog {
    @IsNumber()
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiPropertyOptional()
    @Column({nullable: true, default: null})
    task?: string;

    @IsString()
    @ApiProperty()
    @Column()
    msg: string;

    @ApiProperty()
    @Column({type: 'datetime'})
    datetime: Date;

    // printer
    @ManyToOne(
        type => Printer,
        printer => printer.logs,
        {onDelete: "CASCADE", onUpdate: "CASCADE"}
    )
    printer: Printer;

    // logtype
    @ManyToOne(
        type => PrinterLogType,
        printerLogType => printerLogType.logs,
        {onDelete: "SET NULL", onUpdate: "CASCADE", nullable: true}
    )
    logType: PrinterLogType;

    @ApiProperty()
    @RelationId((printerLog: PrinterLog) => printerLog.logType)
    logTypeId: number;

    // errcode
    @ManyToOne(
        type => PrinterErrorCode,
        printerErrorCode => printerErrorCode.logs,
        {onDelete: "SET NULL", onUpdate: "CASCADE", nullable: true}
    )
    errorCode: PrinterErrorCode;

    @ApiPropertyOptional()
    @RelationId((printerLog: PrinterLog) => printerLog.errorCode)
    errorCodeId?: number;

    // logId
    @OneToMany(
        type => PrinterLog,
        printerLog => printerLog.mainLog
    )
    sublogs: PrinterLog[];

    @ManyToOne(
        type => PrinterLog,
        printerLog => printerLog.sublogs,
        {onDelete: "CASCADE", onUpdate: "CASCADE", nullable: true}
    )
    mainLog: PrinterLog;

    @ApiProperty()
    @RelationId((printerLog: PrinterLog) => printerLog.mainLog)
    mainLogId: number;
}