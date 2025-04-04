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
}

export class GetUserDto {
  @ApiProperty({
    description: 'User id',
    example: 1,
  })
  id: number;
}
