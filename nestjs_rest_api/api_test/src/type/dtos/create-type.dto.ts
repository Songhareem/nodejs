import { ApiPropertyOptional, PickType } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { Type } from "../entities/type.entity";

export class CreateTypeDto extends PickType(Type, ["kind", "name"]) {}

export class CreateTypeResultDto extends ResultDto {
    @ApiPropertyOptional()
    type?: Type;
}