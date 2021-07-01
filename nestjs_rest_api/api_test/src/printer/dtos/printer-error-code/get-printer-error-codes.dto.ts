import { ApiPropertyOptional } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { PrinterErrorCode } from "src/printer/entities/printer-error-code.entity";

export class GetPrinterErrorCodesResultDto extends ResultDto {
    @ApiPropertyOptional()
    errorCodes?: PrinterErrorCode[];
}