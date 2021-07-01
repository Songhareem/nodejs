import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { AuthUser } from "src/authentication/decorators/auth-user.decorator";
import { Role } from "src/authentication/decorators/role.decorator";
import { JwtAuthenticationGuard } from "src/authentication/guards/jwt-authentication.guard";
import { RoleCheckGaurd } from "src/authentication/guards/role-check.guard";
import { CrudReq as Crud } from "src/common/enums/crud-req.enum";
import { ConfirmPrinterReqDto, ConfirmPrinterReqResultDto } from "../dtos/printer/confirm-printer-req.dto";
import { CreatePrinterReqDto, CreatePrinterReqResultDto } from "../dtos/printer/create-printer-req.dto";
import { CreatePrinterDto, CreatePrinterResultDto } from "../dtos/printer/create-printer.dto";
import { DeletePrinterDto, DeletePrinterResultDto } from "../dtos/printer/delete-printer.dto";
import { GetPrinterReqsResultDto } from "../dtos/printer/get-printer-req.dto";
import { GetPrinterResultDto } from "../dtos/printer/get-printer.dto";
import { GetPrintersResultDto } from "../dtos/printer/get-printers.dto";
import { PrinterLoginDto, PrinterLoginResultDto } from "../dtos/printer/printer-login.dto";
import { UpdatePrinterDto, UpdatePrinterResultDto } from "../dtos/printer/update-printer.dto";
import { PrinterKind } from "../entities/printer.entity";
import { PrinterService } from "../services/printer.service";

@ApiTags('Printer')
@Controller('printer')
export class PrinterController {
    constructor(
        private readonly printerService: PrinterService,
    ) {}

    // 요청 승인
    @Post()
    createPrinter(
        @Body() createPrinterDto: CreatePrinterDto
    ): Promise<CreatePrinterResultDto> {
        console.log(createPrinterDto)
        return this.printerService.createPrinter(createPrinterDto);
    }

    @ApiParam({ name: 'kind', enum: PrinterKind })
    @Get('list/:kind')
    getPrinters(
        @Param('kind') kind: PrinterKind,
    ): Promise<GetPrintersResultDto> {
        return this.printerService.getPrinters(kind);
    } 

    @ApiParam({ name: 'id', type: Number})
    @Get(':id')
    getPrinter(
        @Param('id') printerId: number,
    ): Promise<GetPrinterResultDto> {
        return this.printerService.getPrinter(printerId);
    }

    @Put()
    updatePrinter(
        @Body() updatePrinterDto: UpdatePrinterDto
    ): Promise<UpdatePrinterResultDto> {
        return this.printerService.updatePrinter(updatePrinterDto);
    }

    @Delete()
    deletePrinter(
        @Body() deletePrinterDto: DeletePrinterDto
    ): Promise<DeletePrinterResultDto> {
        return this.printerService.deletePrinter(deletePrinterDto);
    }

    // request
    @Role(["Worker","Manager"])         // 1순위 실행
    @UseGuards(RoleCheckGaurd)          // req.user.role로 역할에 따른 실행/비실행 결정
    @UseGuards(JwtAuthenticationGuard)  // 아래있는 Guard가 먼저 실행 (req.user 생성)
    @Post('request')
    async createPrinterReq(
        @AuthUser() userTest,
        @Body() createPrinterReqDto: CreatePrinterReqDto
    ): Promise<CreatePrinterReqResultDto> {
        return { ok:false, error:"test" }
        return this.printerService.createPrinterReq(14, createPrinterReqDto);
    }

    @ApiParam({ name: 'crud', enum: Crud })
    @Get('requests/:crud')
    getPrinterReqs(
        @Param('crud') crud: string,
    ): Promise<GetPrinterReqsResultDto> {
        return this.printerService.getPrinterReqs(crud);
    }

    @Delete('request')
    deletePrinterReq(
        @Body() deletePrinterDto: DeletePrinterDto
    ):Promise<DeletePrinterResultDto> {
        return this.printerService.deletePrinterReq(deletePrinterDto);
    }

    @Post('request/confirm')
    confirmPrinterReq(
        @Body() confirmPrinterReqDto: ConfirmPrinterReqDto
    ): Promise<ConfirmPrinterReqResultDto> {
        return this.printerService.confirmPrinterReq(confirmPrinterReqDto);
    }

    //auth 관련
    @Post('login')
    printerLogin(
        @Body() printerLoginDto: PrinterLoginDto,
        @Res({ passthrough: true }) res,
    ): Promise<PrinterLoginResultDto> {
        return this.printerService.printerLogin(printerLoginDto, res);
    }
}