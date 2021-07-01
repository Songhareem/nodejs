import { PickType } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { PrinterCount } from "src/printer/entities/printer-count.entity";

export class UpdatePrinterCountDto extends PickType(PrinterCount, [
    "id",
    "count",
]) {}

export class UpdatePrinterCountResultDto extends ResultDto {}