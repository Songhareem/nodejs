import { PickType } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { PrinterCount } from "src/printer/entities/printer-count.entity";

export class DeletePrinterCountDto extends PickType(PrinterCount, [
    "id"
]) {}

export class DeletePrinterCountResultDto extends ResultDto {}

