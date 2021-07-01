import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { Printer } from "src/printer/entities/printer.entity";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, RelationId } from "typeorm";
import { ErrCode } from "./err-code.entity";

@Entity()
export class Err {
    
    @ApiPropertyOptional()
    @IsNumber()
    @PrimaryGeneratedColumn({type: 'int'})
    id:number;

    @CreateDateColumn()
    datetime: Date;

    @ManyToOne(
        type => Printer,
        printer => printer.errs,
        {onDelete: "CASCADE", onUpdate: "CASCADE"}
    )
    printer: Printer;

    @ApiProperty()
    @RelationId((err:Err) => err.printer)
    printerId: number;
    
    @ManyToOne(
        type => ErrCode,
        errCode => errCode.errs,
        {onDelete: "CASCADE", onUpdate:"CASCADE"}
    )
    errCode: ErrCode;

    @ApiProperty()
    @RelationId((err:Err) => err.errCode)
    errCodeId: number;
}