import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Headers,
  Res,
} from '@nestjs/common';
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
import { HttpHeaderRequest } from '../@types';
import { Response } from 'express';

@Controller('users')
@ApiTags('Users')
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
    @Headers() headers: HttpHeaderRequest,
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    const response = await this.createUserService.execute({
      body: createUserDto,
      headers,
    });
    res.status(response.status).json(response.body);
  }

  @Get(':id')
  @ApiHeader({
    name: 'token',
    description: 'Access token',
    required: true,
  })
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Retrieves a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'User successfully retrieved',
    type: GetUserResponseDto,
  })
  async findOne(
    @Headers() headers: HttpHeaderRequest,
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    const response = await this.getUserService.execute({
      headers,
      params: { id },
    });
    res.status(response.status).json(response.body);
  }

  @Get()
  @ApiHeader({
    name: 'token',
    description: 'Access token',
    required: true,
  })
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Retrieves all users' })
  @ApiResponse({
    status: 200,
    description: 'Users successfully retrieved',
    type: [GetUserResponseDto],
  })
  async findAll(@Headers() headers: HttpHeaderRequest, @Res() res: Response) {
    const response = await this.getAllUsersService.execute();
    res.status(response.status).json(response.body);
  }
}
