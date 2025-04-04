import {
  Controller,
  Post,
  Body,
  UseGuards,
  Headers,
  Res,
  Get,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { JwtGuard } from '../use-cases/auth/guard/guard.service';
import { CreateShedulingService } from '../use-cases/scheduling/create-scheduling/create-scheduling.service';
import { CreateSchedulingDto } from '../use-cases/scheduling/create-scheduling/create-scheduling.dto';
import { HttpHeaderRequest } from '../@types';
import { Response } from 'express';
import { GetAllSchedulingByUserIdRequestDto } from '../use-cases/scheduling/get-all-scheduling-by-user-id/get-all-scheduling-by-user-id.dto';
import { GetAllShedulingByUserIdService } from '../use-cases/scheduling/get-all-scheduling-by-user-id/get-all-scheduling-by-user-id.service';

@Controller('scheduling')
@ApiTags('Scheduling')
@ApiHeader({
  name: 'token',
  description: 'Access token',
  required: true,
})
export class SchedulingController {
  constructor(
    private readonly createSchedulingService: CreateShedulingService,
    private readonly getAllSchedulingByUserIdService: GetAllShedulingByUserIdService,
  ) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Creates a new scheduling' })
  @ApiResponse({
    status: 201,
    description: 'Scheduling successfully created',
    type: CreateSchedulingDto,
  })
  async create(
    @Headers() headers: HttpHeaderRequest,
    @Res() res: Response,
    @Body() createUserDto: CreateSchedulingDto,
  ) {
    const response = await this.createSchedulingService.execute(createUserDto);
    res.status(response.status).json(response.body);
  }

  @Get(':userId')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Retrieves a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'User successfully retrieved',
    type: GetAllSchedulingByUserIdRequestDto,
  })
  async findOne(
    @Headers() headers: HttpHeaderRequest,
    @Param('userId') id: GetAllSchedulingByUserIdRequestDto,
    @Res() res: Response,
  ) {
    const response = await this.getAllSchedulingByUserIdService.execute(id);
    return res.status(response.status).json(response.body);
  }
}
