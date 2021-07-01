import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { CreatePrinterErrorCodeDto, CreatePrinterErrorCodeResultDto } from "../dtos/printer-error-code/create-printer-error-code.dto";
import { DeletePrinterErrorCodeDto, DeletePrinterErrorCodeResultDto } from "../dtos/printer-error-code/delete-printer-error-code.dto";
import { GetPrinterErrorCodesResultDto } from "../dtos/printer-error-code/get-printer-error-codes.dto";
import { UpdatePrinterErrorCodeDto, UpdatePrinterErrorCodeResultDto } from "../dtos/printer-error-code/update-printer-error-code.dto";
import { PrinterErrorCodeService } from "../services/printer-error-code.service";

@ApiTags('Printer-error-code')
@Controller('printer-error-code')
export class PrinterErrorCodeController {

    constructor(
        private readonly printerErrorCodeService: PrinterErrorCodeService,
    ) {}

    @Post()
    createPrinterErrorCode(
        @Body() createPrinterErrorCodeDto: CreatePrinterErrorCodeDto
    ): Promise<CreatePrinterErrorCodeResultDto> {
        return this.printerErrorCodeService.createPrinterErrorCode(createPrinterErrorCodeDto);
    }

    @Get('list')
    getPrinterErrorCodes(): Promise<GetPrinterErrorCodesResultDto> {
        return this.printerErrorCodeService.getPrinterErrorCodes();
    }

    @Put()
    updatePrinterErrorCode(
        @Body() updatePrinterErrorCodeDto: UpdatePrinterErrorCodeDto
    ): Promise<UpdatePrinterErrorCodeResultDto> {
        return this.printerErrorCodeService.updatePrinterErrorCode(updatePrinterErrorCodeDto);
    }

    @Delete()
    deletePrinterErrorCode(
        @Body() deletePrinterErrorCodeDto: DeletePrinterErrorCodeDto
    ): Promise<DeletePrinterErrorCodeResultDto> {
        return this.printerErrorCodeService.deletePrinterErrorCode(deletePrinterErrorCodeDto);
    }
}
