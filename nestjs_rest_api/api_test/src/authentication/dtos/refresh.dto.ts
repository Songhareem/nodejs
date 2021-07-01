import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";

export class RefreshResultDto {

    @ApiPropertyOptional({type: User, nullable: true})
    user?: User;
}