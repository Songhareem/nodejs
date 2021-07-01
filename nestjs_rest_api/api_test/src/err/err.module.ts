import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrinterModule } from 'src/printer/printer.module';
import { ErrCode } from './entities/err-code.entity';
import { Err } from './entities/err.entity';
import { ErrContoller } from './err.controller';
import { ErrService } from './err.service';

@Module({
    imports: [
        PrinterModule,
        TypeOrmModule.forFeature([
            ErrCode,
            Err,
        ])
    ],
    controllers: [ErrContoller],
    providers: [ErrService],
})
export class ErrorModule {}
