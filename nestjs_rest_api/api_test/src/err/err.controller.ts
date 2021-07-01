import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { CreateErrCodeDto, CreateErrCodeResultDto } from "./dtos/create-err-code.dto";
import { CreateErrDto, CreateErrResultDto } from "./dtos/create-err.dto";
import { DeleteErrCodeDto, DeleteErrCodeResultDto } from "./dtos/delete-err-code.dto";
import { DeleteErrDto, DeleteErrResultDto } from "./dtos/delete-err.dto";
import { GetErrCodesResultDto } from "./dtos/get-err-codes.dto";
import { GetErrsResultDto } from "./dtos/get-errs.dto";
import { UpdateErrCodeDto, UpdateErrCodeResultDto } from "./dtos/update-err-code.dto";
import { ErrService } from "./err.service";

@ApiTags('Error')
@Controller('error')
export class ErrContoller {

    constructor(
        private readonly errService: ErrService,
    ) {}

    @Post('code')
    createErrCode(
        @Body() createErrCodeDto: CreateErrCodeDto
    ): Promise<CreateErrCodeResultDto> {
        return this.errService.createErrCode(createErrCodeDto);
    }

    @Get('code/list')
    getErrCodes(): Promise<GetErrCodesResultDto> {
        return this.errService.getErrCodes();
    }

    @Put('code')
    updateErrCode(
        @Body() updateErrCodeDto: UpdateErrCodeDto
    ): Promise<UpdateErrCodeResultDto> {
        return this.errService.updateErrCode(updateErrCodeDto);
    }

    @Delete('code')
    deleteErrCode(
        @Body() deleteErrCodeDto: DeleteErrCodeDto
    ): Promise<DeleteErrCodeResultDto> {
        return this.errService.deleteErrCode(deleteErrCodeDto)
    }

    @Post()
    createErr(
        @Body() createErrDto: CreateErrDto        
    ): Promise<CreateErrResultDto> {
        return this.errService.createErr(createErrDto);
    }

    @Get(':printerId')
    getErrs(
        @Param('printerId') printerId: string
    ): Promise<GetErrsResultDto> {
        return this.errService.getErrs(Number(printerId));
    }

    @Delete()
    deleteErr(
        @Body() deleteErrDto: DeleteErrDto
    ): Promise<DeleteErrResultDto> {
        return this.errService.deleteErr(deleteErrDto);
    }
}