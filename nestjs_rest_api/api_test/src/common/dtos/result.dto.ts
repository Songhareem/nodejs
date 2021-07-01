import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ResultDto {
    @ApiProperty({type: Boolean})
    ok: boolean;

    @ApiPropertyOptional({type: String, nullable: true})
    error?: string;
}