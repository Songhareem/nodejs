import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Module } from "src/module/entities/module.entity";
import { Printer } from "src/printer/entities/printer.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BoardDetail } from "./board-detail.entity";
import { FilterDetail } from "./fitter-detail.entity";
import { HeadDetail } from "./head-detail.entity";
import { MotionDetail } from "./motion-detail.entity";
import { PumpDetail } from "./pump-detail.entity";
import { ValveDetail } from "./valve-detail.entity";

@Entity()
export class Part {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({type: 'varchar', length: 100})
    serialNo: string;

    @ApiProperty()
    @Column({default: 0})
    count: number;

    @ApiProperty()
    @Column({default: 0})
    totalCount: number;

    @ApiPropertyOptional()
    @Column({nullable: true, default: null})
    resetDate: Date;

    @ApiProperty()
    @CreateDateColumn()
    installedDate: Date

    @ManyToOne(
        type => Printer,
        printer => printer.parts
    )
    printer: Printer;

    @ManyToOne(
        type => Module,
        module => module.parts
    )
    module: Module;

    // details
    @OneToMany(
        type => HeadDetail,
        headDetail => headDetail.part
    )
    headDetails: HeadDetail[];

    @OneToMany(
        type => MotionDetail,
        motionDetail => motionDetail.part
    )
    motionDetails: MotionDetail[];

    @OneToMany(
        type => PumpDetail,
        pumpDetail => pumpDetail.part
    )
    pumpDetails: PumpDetail[];

    @OneToMany(
        type => ValveDetail,
        valveDetail => valveDetail.part
    )
    valveDetails: ValveDetail[];

    @OneToMany(
        type => FilterDetail,
        filterDetail => filterDetail.part
    )
    filterDetails: FilterDetail[];

    @OneToMany(
        type => BoardDetail,
        boardDetail => boardDetail.part
    )
    boardDetails: BoardDetail[];
}