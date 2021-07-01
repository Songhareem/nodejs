import { ApiPropertyOptional } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { PrinterReq } from "../../entities/printer.entity";

export class GetPrinterReqsResultDto extends ResultDto {
    @ApiPropertyOptional()
    printerReqs?: PrinterReq[];
}