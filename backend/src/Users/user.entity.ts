import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { UserFriend } from '../UserFriend/UserFriend.entity';
import { OneToMany } from 'typeorm';

@Entity('users')

export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  'id_42': number;

  @Column({ unique: true })
  displayname: string;

  @Column()
  avatarurl: string;

  @Column()
  istwofactorenabled: boolean;

  @Column()
  wins: number; 

  @Column()
  losses: number;

  @OneToMany(() => UserFriend, userFriend => userFriend.user)
  friends: UserFriend[];
}
