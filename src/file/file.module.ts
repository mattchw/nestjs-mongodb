import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  providers: [FileService],
  imports: [UserModule],
  exports: [FileService],
  controllers: [FileController],
})
export class FileModule {}
