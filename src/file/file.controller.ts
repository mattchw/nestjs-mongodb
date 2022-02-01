import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileUploadDto } from './dto/file.dto';
import { FileService } from './file.service';

@ApiTags('File')
@Controller('files')
export class FileController {
  constructor(private fileService: FileService) {}

  @Post(':email')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of cats',
    type: FileUploadDto,
  })
  uploadFile(
    @Param('email') email: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.fileService.uploadByEmail(email, file);
  }
}
