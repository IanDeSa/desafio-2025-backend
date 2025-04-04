import { Module } from '@nestjs/common';
import { CreateUserService } from './user/create-user/create-user.service';
import { RepositoryModule } from 'src/repositories/repository.module';
import { HealthCheckService } from './health-check.service';

@Module({
  providers: [CreateUserService, HealthCheckService],
  exports: [CreateUserService, HealthCheckService],
  imports: [RepositoryModule],
})
export class UseCaseModule {}
