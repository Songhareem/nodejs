import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { number } from "joi";
import { AuthPrinter } from "../decorators/auth-printer.decorator";
import { CreatePtinerLogTypeDto, CreatePtinerLogTypeResultDto } from "../dtos/printer-log/create-printer-log-type.dto";
import { CreatePrinterLogDto, CreatePrinterLogResultDto } from "../dtos/printer-log/create-printer-log.dto";
import { DeletePrinterLogTypeDto, DeletePrinterLogTypeResultDto } from "../dtos/printer-log/delete-printer-log-type.dto";
import { DeletePrinterLogDto, DeletePrinterLogResultDto } from "../dtos/printer-log/delete-printer-log.dto";
import { GetPrinterLogTypesResultDto } from "../dtos/printer-log/get-printer-log-types.dto";
import { GetPrinterLogsByMainLogIdResultDto } from "../dtos/printer-log/get-printer-logs-by-main-log-id.dto";
import { UpdatePtinerLogTypeDto, UpdatePtinerLogTypeResultDto } from "../dtos/printer-log/update-printer-log-type.dto";
import { Printer } from "../entities/printer.entity";
import { PrinterAuthenticationGuard } from "../guards/printer-authentication.guard";
import { PrinterLogService } from "../services/printer-log.service";

@ApiTags('Printer-log')
@Controller('printer-log')
export class PrinterLogController {
 
    constructor(
        private readonly printerLogTypeService: PrinterLogService
    ) {}

    @Post('type')
    createPrinterLogType(
        @Body() createPrinterLogTypeDto: CreatePtinerLogTypeDto
    ): Promise<CreatePtinerLogTypeResultDto> {
        return this.printerLogTypeService.createPrinterLogType(createPrinterLogTypeDto);
    }

    @Get('type/list')
    getPrinterLogTypes(): Promise<GetPrinterLogTypesResultDto> {
        return this.printerLogTypeService.getPrinterLogTypes();
    }

    @Put('type')
    updatePrinterLogType(
        @Body() updatePrinterLogTypeDto: UpdatePtinerLogTypeDto,
    ): Promise<UpdatePtinerLogTypeResultDto> {
        return this.printerLogTypeService.updatePrinterLogType(updatePrinterLogTypeDto);
    }

    @Delete('type')
    deletePrinterLogType(
        @Body() deletePrinterLogTypeDto: DeletePrinterLogTypeDto
    ): Promise<DeletePrinterLogTypeResultDto> {
        return this.printerLogTypeService.deletePrinterLogType(deletePrinterLogTypeDto);
    }

    @UseGuards(PrinterAuthenticationGuard)
    @Post()
    createPrinterLog(
        @AuthPrinter() printer: Printer,
        @Body() createPrinterLogDto: CreatePrinterLogDto,
    ): Promise<CreatePrinterLogResultDto> {
        return this.printerLogTypeService.createPrinterLog(printer, createPrinterLogDto);
    }

    @UseGuards(PrinterAuthenticationGuard)
    @Get(':mainLogId')
    getPrinterLogsByMainLogId(
        @AuthPrinter() printer: Printer,
        @Param('mainLogId') mainLogId: string,
    ): Promise<GetPrinterLogsByMainLogIdResultDto> {
        return this.printerLogTypeService.getPrinterLogsByMainLogId(printer, Number(mainLogId));
    }

    @UseGuards(PrinterAuthenticationGuard)
    @Delete()
    deletePrinterLog(
        @AuthPrinter() printer: Printer,
        @Body() deletePrinterLogDto: DeletePrinterLogDto,
    ): Promise<DeletePrinterLogResultDto> {
        return this.printerLogTypeService.deletePrinterLog(printer, deletePrinterLogDto);
    }
}
