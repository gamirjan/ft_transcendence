import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { UserFriend } from '../UserFriend/UserFriend.entity';
import { OneToMany } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ unique: true })
  'ID_42': number;

  @Column({ unique: true })
  DisplayName: string;

  @Column()
  AvatarUrl: string;

  @Column()
  IsTwoFactorEnabled: boolean;

  @Column()
  Wins: number; 

  @Column()
  Losses: number;
  
  @ManyToMany(() => User, User => User.friends)
  friends: User[];

}
