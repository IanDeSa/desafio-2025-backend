import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['token'];
    if (!token) {
      throw new HttpException('Token not authorized', HttpStatus.UNAUTHORIZED);
    }

    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      request.user = decoded;
      request.token = token;
      return true;
    } catch (e) {
      console.error('Error verifying token:', e);
      throw new HttpException(
        'Invalid token or expired',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
