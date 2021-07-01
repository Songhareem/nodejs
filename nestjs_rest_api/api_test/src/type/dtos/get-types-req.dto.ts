import { ApiPropertyOptional } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { TypeReq } from "../entities/type.entity";

export class GetTypeReqsResultDto extends ResultDto {
    @ApiPropertyOptional()
    typeReqs?: TypeReq[];
}