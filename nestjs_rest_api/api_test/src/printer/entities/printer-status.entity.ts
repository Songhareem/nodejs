import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Printer } from "./printer.entity";

@Entity()
export class PrinterStatus {

    @ApiProperty({type: Number})
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @ApiProperty({type: Date})
    @CreateDateColumn()
    dateTime: Date;

    @ApiProperty({type: Number})
    @Column({type: Number})
    temperature: number;

    @ApiProperty({type: Number})
    @Column({type: Number})
    humidity: number;

    @ApiProperty({type: String})
    @Column({type: 'varchar', length: 100})
    inkConsumption: string;

    @ManyToOne(
        type => Printer,
        printer => printer.printerStatuses
    )
    printer: Printer
}