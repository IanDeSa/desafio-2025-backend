import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import {
  CreateUserDto,
  CreateUserResponseDto,
} from 'src/use-cases/user/create-user/create-user.dto';
import { CreateUserService } from 'src/use-cases/user/create-user/create-user.service';
import { GetUserResponseDto } from '../use-cases/user/get-user/get-user.dto';
import { GetUserService } from '../use-cases/user/get-user/get-user.service';
import { GetAllUsersService } from '../use-cases/user/get-all/get-all.service';
import { JwtGuard } from '../use-cases/auth/guard/guard.service';

@Controller('users')
@ApiTags('Users')
@ApiHeader({
  name: 'authorization',
  description: 'Access token',
  required: true,
})
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly getUserService: GetUserService,
    private readonly getAllUsersService: GetAllUsersService,
  ) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Creates a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: CreateUserResponseDto,
  })
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    const user = await this.createUserService.execute(createUserDto);
    return user;
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Retrieves a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'User successfully retrieved',
    type: GetUserResponseDto,
  })
  async findOne(@Param('id') id: number): Promise<GetUserResponseDto | null> {
    const user = await this.getUserService.execute(id);
    return user;
  }

  @Get()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Retrieves all users' })
  @ApiResponse({
    status: 200,
    description: 'Users successfully retrieved',
    type: [GetUserResponseDto],
  })
  async findAll(): Promise<GetUserResponseDto[]> {
    const user = await this.getAllUsersService.execute();
    return user;
  }
}
