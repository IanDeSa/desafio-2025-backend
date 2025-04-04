import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import * as bcrypt from 'bcryptjs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { LoginDto } from './login.dto';

dotenv.config();

@Injectable()
export class LoginService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(data: LoginDto): Promise<string> {
    const { email, password } = data;
    if (!email || !password) {
      throw new HttpException(
        'Email and password are required',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const payload = { email: user.email, sub: user.id };
    const acessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    if (!acessToken) {
      throw new HttpException(
        'Token generation failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return acessToken;
  }
}
