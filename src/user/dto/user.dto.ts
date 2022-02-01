import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly displayName: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;

  @ApiProperty()
  readonly isAdmin: boolean;
}
