import { ApiPropertyOptional } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { PrinterLogType } from "src/printer/entities/printer-log.entity";

export class GetPrinterLogTypesResultDto extends ResultDto {
    @ApiPropertyOptional()
    logTypes? : PrinterLogType[];
}