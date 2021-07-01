import { PickType } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { PrinterReq } from "../../entities/printer.entity";

export class DeletePrinterReqDto extends PickType(PrinterReq, ["id"]) {}

export class DeletePrinterReqResultDto extends ResultDto {}