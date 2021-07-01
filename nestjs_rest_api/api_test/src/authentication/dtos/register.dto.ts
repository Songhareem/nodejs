import { ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

export class RegisterDto extends PickType(User, ["email", "name", "password", "role"]) {}

export class RegisterResultDto {

  @ApiPropertyOptional({type: User, nullable: true})
  user?: User;
}
