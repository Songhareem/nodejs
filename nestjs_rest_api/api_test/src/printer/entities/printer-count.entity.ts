import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, Min } from "class-validator";
import { Core } from "src/common/entities/core.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, RelationId } from "typeorm";
import { Printer } from "./printer.entity";

@Entity()
export class PrinterCount extends Core{

    @Min(0)
    @IsNumber()
    @ApiPropertyOptional()
    @Column({type: 'int', default: 0})
    count: number;

    @OneToOne(
        type => Printer,
        {onDelete: "CASCADE", onUpdate: "CASCADE"}
    )
    @JoinColumn()
    printer: Printer;

    @ApiProperty()
    @RelationId((printerCount: PrinterCount) => printerCount.printer)
    printerId: number;
}