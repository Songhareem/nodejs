import { PickType } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { ErrCode } from "../entities/err-code.entity";

export class UpdateErrCodeDto extends PickType(ErrCode, [
    "id",
    "errs",
    "name"
]){}

export class UpdateErrCodeResultDto extends ResultDto {}