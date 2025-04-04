import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Scheduling } from './scheduling.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Scheduling])],
  exports: [TypeOrmModule],
})
export class EntitiesModule {}
