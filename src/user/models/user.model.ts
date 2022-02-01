import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export class User extends Document {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly displayName: string;

  @ApiProperty()
  readonly password: string;

  @ApiProperty()
  readonly isAdmin: boolean;
}
