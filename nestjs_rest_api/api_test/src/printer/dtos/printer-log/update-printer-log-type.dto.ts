import { PartialType, PickType } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { PrinterLogType } from "src/printer/entities/printer-log.entity";

export class UpdatePtinerLogTypeDto extends PartialType(PickType(PrinterLogType, [
    "id",
    "name"
])) {}

export class UpdatePtinerLogTypeResultDto extends ResultDto {}