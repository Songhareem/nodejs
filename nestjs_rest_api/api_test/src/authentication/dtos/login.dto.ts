
import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class LogInDto extends PickType(User, ["email", "password"]){}

export class LoginResultDto {

  // @ApiPropertyOptional({type: String, nullable: true})
  // accessToken?: String;

  // @ApiPropertyOptional({type: String, nullable: true})
  // refreshToken?: String;

  @ApiPropertyOptional()
  user?: User;
}