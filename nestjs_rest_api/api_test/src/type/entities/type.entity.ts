import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Max, Min } from "class-validator";
import { CrudReq as Crud } from "src/common/enums/crud-req.enum";
import { Printer } from "src/printer/entities/printer.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum TypeKind {
    Printer,
    Module,
    Assembly,
    Ink,
    Head,
    Valve,
    Matter,
    Pump,
    Use,
    Board,
    Motion,
}

const typeKindDescription = () => {
    const result = [];
    for(let item in TypeKind) {
        if(isNaN(Number(item))) {
            break;
        }
        result.push(`${item}:${TypeKind[item]}`);
    }
    return result.join(', ');
}

const typeKindMax = (): number => {
    let max = 0;
    for(let item in TypeKind) {
        if(isNaN(Number(item))) {
            break;
        }
        max=Number(item);
    }
    return max;
}

export const getTypekindNum = (typekind: string): number | null => {
    let result = null;
    for(let item in TypeKind) {
        if(typekind === TypeKind[item]) {
            return Number(item);
        }
    }
    return result;
}

export const getTypekindString = (typekind: number): string | null => {
    let result = null;
    for(let item in TypeKind) {
        if(Number(item) === typekind) {
            return TypeKind[item];
        }
    }
    return result;
}

@Entity()
export class Type {
    @ApiProperty({
        minimum: 1
    })
    @IsNumber()
    @PrimaryGeneratedColumn()
    @Min(1)
    id: number;

    @ApiProperty()
    @IsString()
    @Column({type: 'varchar', length: 40})
    name: string;

    @ApiProperty({
        type: Number,
        description: typeKindDescription(),
        minimum: 0,
        maximum: typeKindMax(),
    })
    @IsNumber()
    @Min(0)
    @Max(typeKindMax())
    @Column()
    kind: Number;

    @OneToMany(
        type => Printer,
        printer => printer.type
    )
    printers: Printer[]
}

@Entity()
export class TypeReq {
    @ApiProperty()
    @IsNumber()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({description: 'If crud is "Update", name="Target-Name,New-Name"'})
    @Column({type: 'varchar', length: 40})
    @IsString()
    name: string;

    @ApiProperty({
        type: Number,
        description: typeKindDescription(),
        minimum: 0,
        maximum: typeKindMax(),
    })
    @IsNumber()
    @Min(0)
    @Max(typeKindMax())
    @Column()
    kind: Number;

    @ApiProperty({type: 'enum', enum: Crud})
    @Column({type: 'enum', enum: Crud})
    crud: Crud;

    @ManyToOne(
        type => User,
        user => user.typeReqs,
        { onDelete: "CASCADE", nullable: true }
    )
    user: User;
}