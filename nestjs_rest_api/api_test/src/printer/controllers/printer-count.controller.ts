import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreatePrinterCountDto, CreatePrinterCountResultDto } from "../dtos/printer-count/create-printer-count.dto";
import { DeletePrinterCountDto, DeletePrinterCountResultDto } from "../dtos/printer-count/delete-printer-count.dto";
import { GetPrinterCountResultDto } from "../dtos/printer-count/get-printer-count.dto";
import { GetPrinterCountsResultDto } from "../dtos/printer-count/get-printer-counts.dto";
import { UpdatePrinterCountDto, UpdatePrinterCountResultDto } from "../dtos/printer-count/update-printer-count.dto";
import { PrinterCountService } from "../services/printer-count.service";

@ApiTags('Printer-count')
@Controller('printer-count')
export class PrinterCountController {
    constructor(
        private readonly printerCountService: PrinterCountService,
    ) {}

    @Post()
    createPrinterCount(
        @Body() createPrinterCountDto: CreatePrinterCountDto
    ): Promise<CreatePrinterCountResultDto> {
        return this.printerCountService.createPrinterCount(createPrinterCountDto);
    }

    @Get('list')
    getPrinterCounts(): Promise<GetPrinterCountsResultDto> {
        return this.printerCountService.getPrinterCounts();
    }

    @Get(':id')
    getPrinterCount(
        @Param('id') printerCountId: string
    ): Promise<GetPrinterCountResultDto> {
        return this.printerCountService.getPrinterCount(Number(printerCountId));
    }

    @Put()
    updatePrinterCount(
        @Body() updatePrinterCountDto: UpdatePrinterCountDto
    ): Promise<UpdatePrinterCountResultDto> {
        console.log("asdasdasd");
        return this.printerCountService.updatePrinterCount(updatePrinterCountDto);
    }

    @Delete()
    deletePrinterCount(
        @Body() deletePrinterCountDto: DeletePrinterCountDto
    ): Promise<DeletePrinterCountResultDto> {
        return this.printerCountService.deletePrinterCount(deletePrinterCountDto);
    }
}