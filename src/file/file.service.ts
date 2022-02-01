import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

import fs from 'fs';

@Injectable()
export class FileService {
  constructor(private readonly userService: UserService) {}

  async uploadByEmail(email: string, file: Express.Multer.File) {
    const user = await this.userService.getByEmail(email);

    const temp = `uploads/temp/${file.filename}`;
    const dir = `uploads/${user._id}`;

    fs.mkdirSync(dir, { recursive: true });
    let filename = file.filename;
    let path = `${dir}/${filename}`;
    for (let i = 1; fs.existsSync(path); i++) {
      filename = `${file.filename.slice(
        0,
        file.filename.lastIndexOf('.'),
      )}(${i})${file.filename.slice(file.filename.lastIndexOf('.'))}`;
      path = `${dir}/${filename}`;
    }
    fs.copyFileSync(temp, path);
    fs.rmSync(`uploads/temp`, { recursive: true, force: true });

    return { filename: filename, User: user };
  }
}
