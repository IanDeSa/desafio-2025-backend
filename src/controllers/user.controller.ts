import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  CreateUserDto,
  CreateUserResponseDto,
} from 'src/use-cases/user/create-user/create-user.dto';
import { CreateUserService } from 'src/use-cases/user/create-user/create-user.service';
import { GetUserResponseDto } from '../use-cases/user/get-user/get-user.dto';
import { GetUserService } from '../use-cases/user/get-user/get-user.service';
import { GetAllUsersService } from '../use-cases/user/get-all/get-all.service';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly getUserService: GetUserService,
    private readonly getAllUsersService: GetAllUsersService,
  ) {}

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
    const user = await this.createUserService.execute(createUserDto);
    return user;
  }

  @Get(':id')
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
