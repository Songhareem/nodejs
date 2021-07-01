import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Core {
    @ApiProperty({type: Number})
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @ApiProperty({type: Date})
    @CreateDateColumn()
    createAt: Date;

    @ApiProperty({type: Date})
    @UpdateDateColumn()
    updateAt: Date;
}