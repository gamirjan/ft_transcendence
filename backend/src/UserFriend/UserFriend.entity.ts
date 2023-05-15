import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne } from 'typeorm';
import { User } from '../Users/user.entity';

@Entity('user_friend')
@Unique(['friendId'])
export class UserFriend {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: -1
  })
  userId: number;

  @Column({
    default:0,
  })
  friendId: number;
  @ManyToOne(() => User, user => user.friends)
  user: User;
}