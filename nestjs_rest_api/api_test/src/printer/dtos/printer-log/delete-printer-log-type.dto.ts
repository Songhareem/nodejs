import { PickType } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { PrinterLogType } from "src/printer/entities/printer-log.entity";

export class DeletePrinterLogTypeDto extends PickType(PrinterLogType, ["id"]) {}

export class DeletePrinterLogTypeResultDto extends ResultDto {}