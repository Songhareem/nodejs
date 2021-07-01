import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Joi from 'joi';
import { ErrCode } from './err/entities/err-code.entity';
import { Err } from './err/entities/err.entity';
import { DpiType } from './job/entities/dpi-type.entity';
import { GarmentColor, GarmentType } from './job/entities/garment-type.entity';
import { Job, JobStatusCode } from './job/entities/job.entity';
import { ZigType } from './job/entities/zig-type.entity';
import { BoardDetail } from './part/entities/board-detail.entity';
import { FilterDetail } from './part/entities/fitter-detail.entity';
import { HeadDetail } from './part/entities/head-detail.entity';
import { MotionDetail } from './part/entities/motion-detail.entity';
import { Part } from './part/entities/part.entity';
import { PumpDetail } from './part/entities/pump-detail.entity';
import { ValveDetail } from './part/entities/valve-detail.entity';
import { PrinterCount } from './printer/entities/printer-count.entity';
import { PrinterErrorCode } from './printer/entities/printer-error-code.entity';
import { PrinterLog, PrinterLogType } from './printer/entities/printer-log.entity';
import { PrinterStatus } from './printer/entities/printer-status.entity';
import { Printer, PrinterReq } from './printer/entities/printer.entity';
import { Type, TypeReq } from './type/entities/type.entity';
import { User } from './users/entities/user.entity';
import { Vender } from './vender/entities/vender.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev'?'.env.dev':'.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'test', 'prod').required(),
        RDB_HOST: Joi.string().required(),
        RDB_PORT: Joi.string().required(),
        RDB_NAME: Joi.string().required(),
        RDB_USERNAME: Joi.string().required(),
        RDB_PASSWORD: Joi.string().required(),
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
      })
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.RDB_HOST,
      port: +process.env.RDB_PORT,
      database: process.env.RDB_NAME,
      username: process.env.RDB_USERNAME,
      password: process.env.RDB_PASSWORD,
      synchronize: true,
      logging: true,
      entities: [
        DpiType,
        GarmentType,
        GarmentColor,
        JobStatusCode,
        Job,
        ZigType,
        BoardDetail,
        FilterDetail,
        HeadDetail,
        MotionDetail,
        PumpDetail,
        ValveDetail,
        Printer,
        PrinterReq,
        Vender,
        Part,
        User,
        Type,
        TypeReq,
        ErrCode,
        Err,
        PrinterCount,
        PrinterStatus,
        PrinterErrorCode,
        PrinterLogType,
        PrinterLog,
      ],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
