import { PickType } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { Type } from "../entities/type.entity";

export class DeleteTypeDto extends PickType(Type, ["id"]) {}

export class DeleteTypeResultDto extends ResultDto {}