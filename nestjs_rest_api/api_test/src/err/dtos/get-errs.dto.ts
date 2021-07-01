import { ApiPropertyOptional, PickType } from "@nestjs/swagger"
import { ResultDto } from "src/common/dtos/result.dto"
import { Err } from "../entities/err.entity"

export class GetErrsResultDto extends ResultDto {
    @ApiPropertyOptional()
    errs?: Err[];
}