import { Module } from '@nestjs/common';
import { CreateUserService } from './user/create-user/create-user.service';
import { RepositoryModule } from 'src/repositories/repository.module';
import { HealthCheckService } from './health-check.service';
import { GetUserService } from './user/get-user/get-user.service';
import { GetAllUsersService } from './user/get-all/get-all.service';

@Module({
  providers: [
    CreateUserService,
    GetUserService,
    GetAllUsersService,
    HealthCheckService,
  ],
  exports: [
    CreateUserService,
    GetUserService,
    GetAllUsersService,
    HealthCheckService,
  ],
  imports: [RepositoryModule],
})
export class UseCaseModule {}
