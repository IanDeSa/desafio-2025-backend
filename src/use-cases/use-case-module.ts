import { Module } from '@nestjs/common';
import { CreateUserService } from './user/create-user/create-user.service';
import { RepositoryModule } from 'src/repositories/repository.module';
import { HealthCheckService } from './health-check.service';
import { GetUserService } from './user/get-user/get-user.service';
import { GetAllUsersService } from './user/get-all/get-all.service';
import { JwtGuard } from './auth/guard/guard.service';
import { JwtService } from '@nestjs/jwt';
import { LoginService } from './auth/login/login.service';

@Module({
  providers: [
    CreateUserService,
    GetUserService,
    GetAllUsersService,
    HealthCheckService,
    JwtGuard,
    JwtService,
    LoginService,
  ],
  exports: [
    CreateUserService,
    GetUserService,
    GetAllUsersService,
    HealthCheckService,
    JwtGuard,
    JwtService,
    LoginService,
  ],
  imports: [RepositoryModule],
})
export class UseCaseModule {}
