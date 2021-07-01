import { ApiPropertyOptional, PickType } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { TypeReq } from "../entities/type.entity";

export class CreateTypeReqDto extends PickType(TypeReq, ["name", "crud", "kind"]) {}

export class CreateTypeReqResultDto extends ResultDto {
    @ApiPropertyOptional({type: TypeReq})
    typeReq?: TypeReq
}