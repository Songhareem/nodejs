import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { PrinterReq } from "src/printer/entities/printer.entity";
import { TypeReq } from "src/type/entities/type.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Core } from "../../common/entities/core.entity";

export enum UserRole {
    Maintainer = "Maintainer",
    Manager = "Manager",
    Worker = "Worker",
    Supervisor = "Supervisor",
    Customer = "Customer",
}

@Entity()
export class User extends Core {

    @ApiProperty({type: String})
    @IsString()
    @IsNotEmpty()
    @Column({type: 'varchar', length: 50})
    name: string;

    @ApiProperty({type: String, uniqueItems: true})
    @Column({type: 'varchar', length: 50, unique: true})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({type: String})
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @Column({type: 'varchar'})
    password: string;

    @ApiProperty({description: 'UserRole: ["Manager", "Maintainer", "Worker"]'})
    @Column({type: 'enum', enum: UserRole, default: UserRole.Worker})
    role: UserRole;

    @ApiProperty({type: String, nullable: true})
    @Column({nullable: true})
    currentHashedRefreshToken?: string;

    @OneToMany(
        type => TypeReq,
        typeReq => typeReq.user
    )
    typeReqs: TypeReq[];

    @OneToMany(
        type => PrinterReq,
        printerReq => printerReq.user
    )
    printerReqs: PrinterReq[];
}