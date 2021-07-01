import { ApiPropertyOptional, PickType } from "@nestjs/swagger";
import { Printer } from "src/printer/entities/printer.entity";

export class PrinterLoginDto extends PickType(Printer, [
    "serialNo",
    "password"
]) {}

export class PrinterLoginResultDto {
    @ApiPropertyOptional()
    printer?: Printer;
}