import { ApiPropertyOptional } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { PrinterLog } from "src/printer/entities/printer-log.entity";

export class GetPrinterLogsByMainLogIdResultDto extends ResultDto {
    @ApiPropertyOptional()
    logs?: PrinterLog[];
}