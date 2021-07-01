import { PickType } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { ErrCode } from "../entities/err-code.entity";

export class DeleteErrCodeDto extends PickType(ErrCode, [
    "id"
]) {}

export class DeleteErrCodeResultDto extends ResultDto {}