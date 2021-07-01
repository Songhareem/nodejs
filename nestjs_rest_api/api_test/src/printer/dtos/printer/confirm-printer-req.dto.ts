import { ApiPropertyOptional, PickType } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { PrinterReq } from "../../entities/printer.entity";

export class ConfirmPrinterReqDto extends PickType(PrinterReq, ["id"]) {
    // @ApiPropertyOptional()
    // typeId?: number;
}

export class ConfirmPrinterReqResultDto extends ResultDto {}