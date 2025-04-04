import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { Scheduling, User } from 'src/database/models';
import { SchedulingRepository } from './scheduling.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Scheduling])],
  providers: [UserRepository, SchedulingRepository],
  exports: [UserRepository, SchedulingRepository],
})
export class RepositoryModule {}
