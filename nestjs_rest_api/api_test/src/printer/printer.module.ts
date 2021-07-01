import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeModule } from 'src/type/type.module';
import { UserModule } from 'src/users/users.module';
import { Printer, PrinterReq } from './entities/printer.entity';
import { PrinterController } from './controllers/printer.controller';
import { PrinterService } from './services/printer.service';
import { PrinterCount } from './entities/printer-count.entity';
import { PrinterCountController } from './controllers/printer-count.controller';
import { PrinterCountService } from './services/printer-count.service';
import { PrinterStatus } from './entities/printer-status.entity';
import { PrinterErrorCode } from './entities/printer-error-code.entity';
import { PrinterErrorCodeController } from './controllers/printer-error-code.controller';
import { PrinterErrorCodeService } from './services/printer-error-code.service';
import { PrinterLog, PrinterLogType } from './entities/printer-log.entity';
import { PrinterLogController } from './controllers/printer-log.controller';
import { PrinterLogService } from './services/printer-log.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeModule,
        UserModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_PRINTER_TOKEN_SECRET'),
                signOptions: {
                    expiresIn: `${configService.get('JWT_PRINTER_TOKEN_EXPIRATION_TIME')}s`,
                },
            }),
        }),
        TypeOrmModule.forFeature([
            Printer,
            PrinterReq,
            PrinterCount,
            PrinterStatus,
            PrinterErrorCode,
            PrinterLogType,
            PrinterLog,
        ]),
    ],
    controllers: [
        PrinterController, 
        PrinterCountController,
        PrinterErrorCodeController,
        PrinterLogController,
    ],
    providers: [
        PrinterService, 
        PrinterCountService,
        PrinterErrorCodeService,
        PrinterLogService,
    ],
    exports: [
        PrinterService, 
        PrinterCountService,
        PrinterErrorCodeService,
        PrinterLogService,
    ],
})
export class PrinterModule {}
