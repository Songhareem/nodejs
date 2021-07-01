import { ApiPropertyOptional, PickType } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { PrinterReq } from "../../entities/printer.entity";

export class CreatePrinterReqDto extends PickType(PrinterReq, [
    "serialNo",
    "crud",
    "typeId",
]) {}

export class CreatePrinterReqResultDto extends ResultDto {}