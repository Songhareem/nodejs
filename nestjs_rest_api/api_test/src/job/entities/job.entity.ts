import { ApiProperty } from "@nestjs/swagger";
import { Printer } from "src/printer/entities/printer.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DpiType } from "./dpi-type.entity";
import { GarmentColor, GarmentType } from "./garment-type.entity";
import { ZigType } from "./zig-type.entity";

@Entity()
export class JobStatusCode {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    status: string;

    @OneToMany(
        type => Job,
        job => job.jobStatusCode
    )
    jobs: Job[];
}

@Entity()
export class Job {
    
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    filename: string;

    @ApiProperty()
    @Column()
    copy: number;

    @ApiProperty()
    @Column()
    current: number;

    @ApiProperty()
    @CreateDateColumn()
    startTime: Date;

    @ApiProperty()
    @UpdateDateColumn()
    endTime: Date;

    @ApiProperty()
    @Column()
    elapsedTime: Date;

    @ManyToOne(
        type => Printer,
        printer => printer.jobs
    )
    printer: Printer;

    @ManyToOne(
        type => JobStatusCode,
        jobStatusCode => jobStatusCode.jobs
    )
    jobStatusCode: JobStatusCode;

    @ManyToOne(
        type => GarmentType,
        garmentType => garmentType.jobs
    )
    garmentType: GarmentType;

    @ManyToOne(
        type => GarmentColor,
        garmentColor => garmentColor.jobs
    )
    garmentColor: GarmentColor;

    @ManyToOne(
        type => ZigType,
        zigType => zigType.jobs
    )
    zigType: ZigType;

    @ManyToOne(
        type => DpiType,
        dpiType => dpiType.jobs
    )
    dpiType: DpiType;

    // user
    // @ManyToOne(
    //     type => ZigType,
    //     zigType => zigType.jobs
    // )
    // zigType: ZigType;
}