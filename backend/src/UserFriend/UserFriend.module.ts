import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne } from 'typeorm';
import { User } from '../Users/user.entity'; 

@Entity()
@Unique(['userId', 'friendId'])
export class UserFriend {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  friendId: number;

  @ManyToOne(() => User, user => user.friends)
  user: User;
}