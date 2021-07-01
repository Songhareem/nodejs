import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { CrudReq } from "src/common/enums/crud-req.enum";
import { ConfirmTypeReqDto, ConfirmTypeReqResultDto } from "./dtos/confitm-type-req.dto";
import { CreateTypeReqDto, CreateTypeReqResultDto } from "./dtos/create-type-req.dto";
import { CreateTypeDto, CreateTypeResultDto } from "./dtos/create-type.dto";
import { DeleteTypeDto, DeleteTypeResultDto } from "./dtos/delete-type.dto";
import { GetTypeReqsResultDto } from "./dtos/get-types-req.dto";
import { GetTypesResultDto } from "./dtos/get-types.dto";
import { UpdateTypeDto, UpdateTypeResultDto } from "./dtos/update-type.dto";
import { TypeKind } from "./entities/type.entity";
import { TypeService } from './type.service';

@ApiTags('Types')
@Controller('types')
export class TypeController {

    constructor(
        private readonly typeService: TypeService,
    ) {}

    @Post()
    createType(
        @Body() createTypeDto: CreateTypeDto
    ): Promise<CreateTypeResultDto> {
        return this.typeService.createType(createTypeDto);
    }

    @ApiParam({ name: 'kind', enum: TypeKind })
    @Get(':kind')
    getTypes(
        @Param('kind') kind: string
    ): Promise<GetTypesResultDto> {
        return this.typeService.getTypes(kind);
    }

    @Put()
    updateType(
        @Body() updateTypeDto: UpdateTypeDto
    ): Promise<UpdateTypeResultDto> {
        return this.typeService.updateType(updateTypeDto);
    }

    @Delete()
    deleteType(
        @Body() deleteTypeDto: DeleteTypeDto
    ): Promise<DeleteTypeResultDto> {
        return this.typeService.deleteType(deleteTypeDto);
    }

    //request
    @Post('request')
    async createTypeReq(
        @Body() createReqTypeDto: CreateTypeReqDto
    ): Promise<CreateTypeReqResultDto> {
        return this.typeService.createTypeReq(14, createReqTypeDto);
    }

    @ApiParam({ name: 'kind', enum: TypeKind })
    @ApiParam({ name: 'crud', enum: CrudReq })
    @Get('requests/:crud/:kind')
    getTypeReqs(
        @Param('crud') crud: string,
        @Param('kind') kind: string,
    ): Promise<GetTypeReqsResultDto> {
        return this.typeService.getTypeReqs(kind, crud);
    }

    @Delete('request')
    deleteTypeReq(
        @Body() deleteTypeDto: DeleteTypeDto
    ):Promise<DeleteTypeResultDto> {
        return this.typeService.deleteTypeReq(deleteTypeDto);
    }

    @Post('request/confirm')
    confirmTypeReq(
        @Body() confirmTypeReqDto: ConfirmTypeReqDto
    ): Promise<ConfirmTypeReqResultDto> {
        return this.typeService.confirmTypeReq(confirmTypeReqDto);
    }
}