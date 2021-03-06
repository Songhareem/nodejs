import { ApiPropertyOptional } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { PrinterCount } from "src/printer/entities/printer-count.entity";

export class GetPrinterCountsResultDto extends ResultDto {
    @ApiPropertyOptional()
    printerCounts?: PrinterCount[];
}