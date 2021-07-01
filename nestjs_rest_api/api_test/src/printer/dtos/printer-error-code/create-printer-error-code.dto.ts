import { PickType } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { PrinterErrorCode } from "src/printer/entities/printer-error-code.entity";

export class CreatePrinterErrorCodeDto extends PickType(PrinterErrorCode, [
    "code",
    "detail"
]){}

export class CreatePrinterErrorCodeResultDto extends ResultDto {}