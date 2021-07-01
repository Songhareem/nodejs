import { ApiProperty, ApiPropertyOptional, PickType } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { PrinterLog } from "src/printer/entities/printer-log.entity";

export class CreatePrinterLogDto extends PickType(PrinterLog, [
    "task",
    "msg",
    "datetime",
    "logTypeId",
    "errorCodeId",
]) {
    @ApiProperty({type: Number})
    mainLogId: number;
}

export class CreatePrinterLogResultDto extends ResultDto {
    @ApiPropertyOptional()
    mainLogId?: number;
}