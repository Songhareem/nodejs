import { ApiProperty, ApiPropertyOptional, PickType } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { ResultDto } from "src/common/dtos/result.dto";
import { Printer } from "../../entities/printer.entity";

export class CreatePrinterDto extends PickType(Printer, [
    "serialNo",
]) {
    @ApiProperty({ type: Number })
    @IsNumber()
    typeId: number;
}

export class CreatePrinterResultDto extends ResultDto {

    @ApiPropertyOptional()
    printer?: Printer;
}