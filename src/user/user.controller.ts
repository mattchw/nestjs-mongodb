import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { User } from './models/user.model';
import RoleGuard from '../auth/guard/role-auth.guard';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // Retrieve User list
  @Get()
  @UseGuards(RoleGuard(['Admin']))
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: User,
  })
  async listUsers(): Promise<User[]> {
    return this.userService.list();
  }

  // Get User by email
  @Get(':email')
  @UseGuards(RoleGuard(['Admin']))
  async getUserByEmail(@Param('email') email: string) {
    return this.userService.getByEmail(email);
  }

  // create user
  @Post('register')
  @UseGuards(RoleGuard(['Admin']))
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: User,
  })
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.create(body);
  }
}
