import { ApiPropertyOptional } from "@nestjs/swagger";
import { ResultDto } from "src/common/dtos/result.dto";
import { Printer } from "../../entities/printer.entity";

export class GetPrinterResultDto extends ResultDto {
    @ApiPropertyOptional()
    printer?: Printer;
}