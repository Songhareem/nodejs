import { ApiPropertyOptional } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { ErrCode } from "../entities/err-code.entity";

export class GetErrCodesResultDto extends ResultDto {
    @ApiPropertyOptional()
    errCodes?: ErrCode[];
}