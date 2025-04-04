import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Role } from '../../../enums/role-user.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'João Silva',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'User email',
    example: 'joao.silva@example.com',
  })
  @Transform(({ value }) => value.trim())
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Role user',
    example: Role.STUDENT,
    enum: Role,
  })
  @IsEnum(Role)
  role: Role;
}

export class CreateUserResponseDto {
  @ApiProperty({
    description: 'User ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'User name',
    example: 'João Silva',
  })
  name: string;

  @ApiProperty({
    description: 'User email',
    example: 'joao.silva@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Role user',
    example: Role.STUDENT,
    enum: Role,
  })
  role: Role;

  @ApiProperty({
    description: 'Date when the user was created',
    example: '2023-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the user was last updated',
    example: '2023-01-02T00:00:00.000Z',
  })
  updatedAt: Date;
}

export class CreateUserResponse {
  body: CreateUserResponseDto;
  status: number;
}
