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

  async SetPin(userid: number, pin: string): Promise<void> {
    const userpin = new UserPin();
    userpin.userid = userid;
    userpin.pin = await bcrypt.hash(pin, 10);
    if (!await this.userPinsRepository.save(userpin))
        throw new InternalServerErrorException();
    var user = await this.usersRepository.findOne({ where: { id: userid } });
    user.istwofactorenabled = true;
    if (!await this.usersRepository.save(user))
        throw new InternalServerErrorException();
  }

  async CheckPin(userid: number, pin: string): Promise<object> {
    var user = await this.userPinsRepository.findOne({ where: { userid: userid } });
    if (!user)
        throw new BadRequestException();
    return { verify: await bcrypt.compare(pin, user.pin) }
  }
}
