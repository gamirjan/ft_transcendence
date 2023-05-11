// user.dto.ts

import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsNumber()
  readonly '42Id': number;

  @IsNotEmpty()
  @IsString()
  readonly displayName: string;

  @IsOptional()
  @IsString()
  readonly avatarUrl?: string;

  @IsBoolean()
  readonly isTwoFactorEnabled: boolean;

  @IsOptional()
  @IsNumber()
  readonly wins?: number;

  @IsOptional()
  @IsNumber()
  readonly losses?: number;
}