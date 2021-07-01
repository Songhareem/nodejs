import { ApiPropertyOptional, PartialType, PickType } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { Printer } from "../../entities/printer.entity";

export class UpdatePrinterDto extends PartialType(PickType(Printer, [
    "id",
    "serialNo",
])) {
    @ApiPropertyOptional()
    typeId?: number;
}

export class UpdatePrinterResultDto extends ResultDto {}