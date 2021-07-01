import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePtinerLogTypeDto, CreatePtinerLogTypeResultDto } from "../dtos/printer-log/create-printer-log-type.dto";
import { CreatePrinterLogDto, CreatePrinterLogResultDto } from "../dtos/printer-log/create-printer-log.dto";
import { DeletePrinterLogTypeDto, DeletePrinterLogTypeResultDto } from "../dtos/printer-log/delete-printer-log-type.dto";
import { DeletePrinterLogDto, DeletePrinterLogResultDto } from "../dtos/printer-log/delete-printer-log.dto";
import { GetPrinterLogTypesResultDto } from "../dtos/printer-log/get-printer-log-types.dto";
import { GetPrinterLogsByMainLogIdResultDto } from "../dtos/printer-log/get-printer-logs-by-main-log-id.dto";
import { UpdatePtinerLogTypeDto, UpdatePtinerLogTypeResultDto } from "../dtos/printer-log/update-printer-log-type.dto";
import { PrinterErrorCode } from "../entities/printer-error-code.entity";
import { PrinterLog, PrinterLogType } from "../entities/printer-log.entity";
import { Printer } from "../entities/printer.entity";

@Injectable()
export class PrinterLogService {
    
    constructor(
        @InjectRepository(PrinterLogType)
        private readonly printerLogTypeRepository: Repository<PrinterLogType>,
        
        @InjectRepository(PrinterLog)
        private readonly printerLogRepository: Repository<PrinterLog>,

        @InjectRepository(PrinterErrorCode)
        private readonly printerErrorCodeRepository: Repository<PrinterErrorCode>,
    ) {}

    async createPrinterLogType(
        { name }: CreatePtinerLogTypeDto
    ): Promise<CreatePtinerLogTypeResultDto> {
        try {
            const logType = await this.printerLogTypeRepository.findOne({ name });
            if(logType) {
                return { ok: false, error:"The printer log type already exist" }
            }
            await this.printerLogTypeRepository.save(
                this.printerLogTypeRepository.create({name})
            );
            return { 
                ok: true 
            }
        } catch(error) {
            return { ok: false, error: "Couldn't create printer log type" }
        }
    }

    async getPrinterLogTypes(): Promise<GetPrinterLogTypesResultDto> {
        try {
            const logTypes = await this.printerLogTypeRepository.find();
            if(logTypes.length <= 0) {
                return { ok: false, error: "The printer log types not found" }
            }
            return {
                ok: true,
                logTypes
            }
        } catch(error) {
            return { ok: false, error: "Couldn't get printer log types" }
        }
    }

    async updatePrinterLogType(
        updatePrinterLogTypeDto: UpdatePtinerLogTypeDto,
    ): Promise<UpdatePtinerLogTypeResultDto> {
        try {
            const logType = await this.printerLogTypeRepository.findOne(
                updatePrinterLogTypeDto.id
            );
            if(!logType) {
                return { ok: false, error: "The printer log type not found" }
            }
            await this.printerLogTypeRepository.update(
                updatePrinterLogTypeDto.id,
                { ...updatePrinterLogTypeDto }
            )
            return {
                ok: true
            }
        } catch(error) {
            return { ok: false, error: "Couldn't update printer log type" }
        }
    }

    async deletePrinterLogType(
        { id }: DeletePrinterLogTypeDto
    ): Promise<DeletePrinterLogTypeResultDto> {
        try {
            const logType = await this.printerLogTypeRepository.findOne(id);
            if(!logType) {
                return { ok: false, error: "The printer log type not found" }
            }
            await this.printerLogTypeRepository.delete(id);
            return {
                ok: true
            }
        } catch(error) {
            return { ok: false, error: "Couldn't delete printer log type" }
        }
    }

    async createPrinterLog(
        printer: Printer,
        createPrinterLogDto: CreatePrinterLogDto,
    ): Promise<CreatePrinterLogResultDto> {
        try {
            const { 
                task, 
                msg, 
                datetime, 
                logTypeId, 
                errorCodeId,
                mainLogId,
            } = createPrinterLogDto;
            const mainLog = !mainLogId? undefined:await this.printerLogRepository.findOne(mainLogId);
            if(mainLogId && !mainLog) {
                return { ok: false, error: "Printer main log not found" }
            }
            const logType = await this.printerLogTypeRepository.findOne(logTypeId);
            if(!logType) {
                return { ok: false, error: "Printer log type not found" }
            }
            const errorCode = !errorCodeId? undefined:await this.printerErrorCodeRepository.findOne(errorCodeId);
            if(errorCodeId && !errorCode) {
                return { ok: false, error: "Ptiner error code not found" }
            }
            const log = await this.printerLogRepository.save(
                this.printerLogRepository.create({
                    task,
                    msg,
                    datetime,
                    printer,
                    logType,
                    errorCode,
                    mainLog,
                })
            );
            return {
                ok: true,
                mainLogId: !mainLogId? log.id:undefined
            }
        } catch(error) {
            return { ok: false, error: "Couldn't create printer log" }
        }
    }

    async getPrinterLogsByMainLogId(
        printer: Printer,
        mainLogId: number,
    ): Promise<GetPrinterLogsByMainLogIdResultDto> {
        try {
            const logs = await this.printerLogRepository.find({
                where: [{
                    id: mainLogId, 
                    printer: printer.id
                },{
                    printer: printer.id,
                    mainLog: mainLogId,
                }],
                order: {
                    datetime: "ASC",
                }
            })
            if(logs.length <= 0) {
                return { ok: false, error: "Printer logs not found" }
            }
            return {
                ok: true,
                logs
            }
        } catch(error) {
            return { ok: false, error: "Couldn't get printer logs" }
        }
    }

    async deletePrinterLog(
        printer: Printer,
        { id }: DeletePrinterLogDto,
    ): Promise<DeletePrinterLogResultDto> {
        try {
            const log = await this.printerLogRepository.findOne({
                where: {id, printer: printer.id}
            });
            if(!log) {
                return { ok: false, error: "Priner log not found" }
            }
            await this.printerLogRepository.delete(id);
            return { 
                ok: true 
            }
        } catch(error) {
            return { ok: false, error: "Couldn't delete printer log" }
        }
    }
}