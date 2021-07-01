import { PickType } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { TypeReq } from "../entities/type.entity";

export class ConfirmTypeReqDto extends PickType(TypeReq, ["id"]) {}

export class ConfirmTypeReqResultDto extends ResultDto {}