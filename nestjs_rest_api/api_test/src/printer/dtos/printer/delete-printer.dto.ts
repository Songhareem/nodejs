import { PickType } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { Printer } from "../../entities/printer.entity";

export class DeletePrinterDto extends PickType(Printer, ["id"]) {}

export class DeletePrinterResultDto extends ResultDto {}