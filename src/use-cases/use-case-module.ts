import { Module } from '@nestjs/common';
import { CreateUserService } from './user/create-user/create-user.service';
import { RepositoryModule } from 'src/repositories/repository.module';
import { HealthCheckService } from './health-check.service';
import { GetUserService } from './user/get-user/get-user.service';
import { GetAllUsersService } from './user/get-all/get-all.service';
import { JwtGuard } from './auth/guard/guard.service';
import { JwtService } from '@nestjs/jwt';
import { LoginService } from './auth/login/login.service';
import { CreateShedulingService } from './scheduling/create-scheduling/create-scheduling.service';
import { GetAllShedulingByUserIdService } from './scheduling/get-all-scheduling-by-user-id/get-all-scheduling-by-user-id.service';

@Module({
  providers: [
    CreateUserService,
    GetUserService,
    GetAllUsersService,
    HealthCheckService,
    JwtGuard,
    JwtService,
    LoginService,
    CreateShedulingService,
    GetAllShedulingByUserIdService,
  ],
  exports: [
    CreateUserService,
    GetUserService,
    GetAllUsersService,
    HealthCheckService,
    JwtGuard,
    JwtService,
    LoginService,
    CreateShedulingService,
    GetAllShedulingByUserIdService,
  ],
  imports: [RepositoryModule],
})
export class UseCaseModule {}
