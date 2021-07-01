import { ApiProperty, ApiPropertyOptional, PartialType, PickType } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { Type } from "../entities/type.entity";

export class UpdateTypeDto extends PartialType(
    PickType(Type, ["id", "name"])
) {}

export class UpdateTypeResultDto extends ResultDto {}