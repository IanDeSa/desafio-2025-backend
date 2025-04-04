import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../use-cases/auth/login/login.dto';
import { LoginService } from '../use-cases/auth/login/login.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    type: String,
  })
  async login(@Body() loginUserDto: LoginDto): Promise<string> {
    const user = await this.loginService.execute(loginUserDto);
    return user;
  }
}
