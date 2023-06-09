import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../Users/user.entity';

export enum ChannelType {
    Public = 'public',
    Private = 'private',
}

@Entity('channels')
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ChannelType })
  channeltype: ChannelType;

  @Column()
  channelname: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'ownerid' })
  owner: User;
}