import { PickType } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { PrinterCount } from "src/printer/entities/printer-count.entity";

export class CreatePrinterCountDto extends PickType(PrinterCount, [
    "printerId",
    "count"
]) {}

export class CreatePrinterCountResultDto extends ResultDto {}