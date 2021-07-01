import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { PrinterErrorCode } from "src/printer/entities/printer-error-code.entity";

export class UpdatePrinterErrorCodeDto extends PartialType(
    PickType(PrinterErrorCode, [
        "code",
        "detail",
    ])
) {
    @ApiProperty()
    id: number;
}

export class UpdatePrinterErrorCodeResultDto extends ResultDto {}