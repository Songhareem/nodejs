import { PickType } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { PrinterErrorCode } from "src/printer/entities/printer-error-code.entity";

export class DeletePrinterErrorCodeDto extends PickType(PrinterErrorCode, [
    "id"
]) {}

export class DeletePrinterErrorCodeResultDto extends ResultDto {}