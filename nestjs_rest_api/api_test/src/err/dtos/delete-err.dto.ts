import { PickType } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { Err } from "../entities/err.entity";

export class DeleteErrDto extends PickType(Err, [
    "id",
]) {}

export class DeleteErrResultDto extends ResultDto {}