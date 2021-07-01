import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Type, TypeReq } from './entities/type.entity';
import { TypeController } from './type.controller';
import { TypeService } from './type.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Type,
            TypeReq,
            User,
        ]),
    ],
    controllers: [TypeController],
    providers: [TypeService],
    exports: [TypeService],
})
export class TypeModule {}
