import { PickType } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { PrinterLogType } from "src/printer/entities/printer-log.entity";

export class CreatePtinerLogTypeDto extends PickType(PrinterLogType, [
    "name"
]) {}

export class CreatePtinerLogTypeResultDto extends ResultDto {}