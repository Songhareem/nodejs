import { PickType } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { Err } from "../entities/err.entity";

export class CreateErrDto extends PickType(Err, [
    "printerId",
    "errCodeId",
]) {}

export class CreateErrResultDto extends ResultDto {}