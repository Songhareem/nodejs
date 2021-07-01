import { PickType } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { ErrCode } from "../entities/err-code.entity";

export class CreateErrCodeDto extends PickType(ErrCode, ["code", "name"]) {}

export class CreateErrCodeResultDto extends ResultDto {}