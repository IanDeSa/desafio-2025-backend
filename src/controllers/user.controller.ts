import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  CreateUserDto,
  CreateUserResponseDto,
} from 'src/use-cases/user/create-user/create-user.dto';
import { CreateUserService } from 'src/use-cases/user/create-user/create-user.service';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: CreateUserService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: CreateUserResponseDto,
  })
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    const user = await this.userService.execute(createUserDto);
    return user;
  }

  //   @Get(':id')
  //   @ApiOperation({ summary: 'Obtém um usuário pelo ID' })
  //   @ApiResponse({
  //     status: 200,
  //     description: 'Usuário encontrado',
  //     type: UserResponseDto,
  //   })
  //   async findOne(@Param('id') id: number): Promise<UserResponseDto> {
  //     const user = await this.userService.findOne(id);
  //     return {
  //       id: user.id,
  //       name: user.name,
  //       email: user.email,
  //       role: user.role,
  //     };
  //   }
}
