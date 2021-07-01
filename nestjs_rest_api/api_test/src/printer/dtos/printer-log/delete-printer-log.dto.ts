import { PickType } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { PrinterLog } from "src/printer/entities/printer-log.entity";

export class DeletePrinterLogDto extends PickType(PrinterLog, ["id"]) {}

export class DeletePrinterLogResultDto extends ResultDto {}