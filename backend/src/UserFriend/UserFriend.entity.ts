import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../Users/user.entity';

@Entity('userfriends')
export class UserFriend {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.friends)
  @JoinColumn({ name: 'userid' })
  user: User;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'friendid' })
  friend: User;
}