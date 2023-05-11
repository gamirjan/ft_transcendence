import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ unique: true })
  '42Id': number;

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
}
