import { Controller, Get, NotFoundException, Param, Res, Post, Body, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './user.service';
import { User } from './user.entity';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Res() res): Promise<User[]> {
    console.log("/user request");
    
    return res.send(await this.usersService.findAll());
  }

  @Get('/:id')
  async findone(@Param('id') userId: number, @Res() res): Promise<User> {
  console.log("/user/:id requset");
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new NotFoundException(`User with id '${userId}' not found`);
    }
    return res.send(user);
  }

  @Get('byName/:displayName')
  async findByDisplayName(@Param('displayName') displayName: string, @Res() res): Promise<User> {
    const user = await this.usersService.findOneByDisplayName(displayName);
    if (!user) {
      throw new NotFoundException(`User with displayName '${displayName}' not found`);
    }
    return res.send(user);
  }

  @Post('avatar')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
        userid: {
          type: 'number',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './photos',
      filename: (req, file, callback) => {
        const uniqueName = uuid();
        const fileExtension = extname(file.originalname);
        callback(null, `${uniqueName}${fileExtension}`);
      },
    }),
  }))
  async uploadUserAvatar(@UploadedFile() file: Express.Multer.File, @Body() payload: { userid: number }, @Res() res): Promise<void> {
    const { userid } = payload;
    var user = await this.usersService.findOneByPKId(userid);
    if (!user)
    {
      throw new BadRequestException("User not found!");
    }
    if (!file)
    {
      res.status(400).send('No avatar found in the request');
    }
    else
    {
      const avatarUrl = `/app/photos/${file.filename}`;
      user.avatarurl = avatarUrl;
      this.usersService.updateUserInfo(user);
      res.status(200).send({ avatarUrl });
    }
  }
}