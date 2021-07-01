import { ApiPropertyOptional, PickType } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { Type } from "../entities/type.entity";

//export class GetTypesDto extends PickType(Type, ["kind"]) {}

export class GetTypesResultDto extends ResultDto {
    @ApiPropertyOptional()
    types?: Type[];
}