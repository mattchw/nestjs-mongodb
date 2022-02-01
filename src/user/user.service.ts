import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt';

import { User } from './models/user.model';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  // list all users
  async list(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async get(userId): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    return user;
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({
      email,
    });
    if (user === null) {
      throw new NotFoundException(`User with email: ${email} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newPassword = await bcrypt.hash(createUserDto.password, 10);
    const newCustomer = new this.userModel({
      ...createUserDto,
      password: newPassword,
    });
    return await newCustomer.save();
  }
}
