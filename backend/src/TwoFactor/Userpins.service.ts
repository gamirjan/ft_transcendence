import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPin } from './userpins.entity';
import { BadRequestException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserPinsService {
  constructor(
    @InjectRepository(UserPin)
    private userPinsRepository: Repository<UserPin>
  ) {}

  async SetPin(userid: number, pin: string): Promise<void> {
    const userpin = new UserPin();
    userpin.userid = userid;
    userpin.pin = await bcrypt.hash(pin, 10);
    if (!await this.userPinsRepository.save(userpin))
        throw new InternalServerErrorException();
  }

  async CheckPin(userid: number, pin: string): Promise<object> {
    var user = await this.userPinsRepository.findOne({ where: { userid: userid } });
    if (!user)
        throw new BadRequestException();
    return { verify: await bcrypt.compare(pin, user.pin) }
  }
}
