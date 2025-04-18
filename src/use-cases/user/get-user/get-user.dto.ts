import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../../enums/role-user.enum';

export class GetUserResponseDto {
  @ApiProperty({
    description: 'User id',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'User name',
    example: 'João Silva',
  })
  name: string;

  @ApiProperty({
    description: 'User e-mail',
    example: 'joao.silva@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'User role',
    example: 'student',
    enum: Role,
  })
  role: Role;

  @ApiProperty({
    description: 'User created at',
    example: '2023-10-01T12:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'User updated at',
    example: '2023-10-01T12:00:00Z',
  })
  updatedAt: Date;
}

export class GetUserDto {
  @ApiProperty({
    description: 'User e-mail',
    example: 'joao.silva@example.com',
  })
  email: string;
}

export class GetUserResponse {
  @ApiProperty({
    description: 'Response body containing the created user details',
    type: GetUserResponseDto,
  })
  body: GetUserResponseDto;

  @ApiProperty({
    description: 'HTTP status code',
    example: 201,
  })
  status: number;
}
