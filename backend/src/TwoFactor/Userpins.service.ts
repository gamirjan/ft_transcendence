import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPin } from './Userpins.entity';
import { BadRequestException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';
import { User } from '../Users/user.entity';

@Injectable()
export class UserPinsService {
  constructor(
    @InjectRepository(UserPin)
    private userPinsRepository: Repository<UserPin>,
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async EnableTF(userid: number, email: string): Promise<void> {
    if (!email)
      throw new BadRequestException("email field is required");
    var user = await this.usersRepository.findOne({ where: { id: userid } });
    if (!user || user.istwofactorenabled === true)
      throw new BadRequestException();
    user.istwofactorenabled = true;
    user.twofactoremail = email;
    if (!await this.usersRepository.save(user))
        throw new InternalServerErrorException();
  }

  async DisableTF(userid: number): Promise<void> {
    var user = await this.usersRepository.findOne({ where: { id: userid } });
    if (!user || user.istwofactorenabled === false)
      throw new BadRequestException();
    user.istwofactorenabled = false;
    if (!await this.usersRepository.save(user))
      throw new InternalServerErrorException();
  }

  async CheckPin(userid: number, pin: string): Promise<object> {
    var userPin = await this.userPinsRepository.findOne({ where: { userid: userid } });
    if (!userPin)
        throw new BadRequestException();
    const isverified = await bcrypt.compare(pin, userPin.pin);
    if (isverified)
    {
      if (!await this.userPinsRepository.remove(userPin))
        throw new InternalServerErrorException();
    }
    return { verify: isverified }
  }
}
