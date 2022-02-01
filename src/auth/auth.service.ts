import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.getByEmail(email);

    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (user && isPasswordValid) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id, isAdmin: user.isAdmin };
    return {
      token: this.jwtService.sign(payload),
      user,
    };
  }
}
