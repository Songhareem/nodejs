import { ApiPropertyOptional, PickType } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { Type } from "../entities/type.entity";

export class GetTypeDto extends PickType(Type, ["id"]) {}

export class GetTypeResultDto extends ResultDto {
    @ApiPropertyOptional()
    type?: Type
}