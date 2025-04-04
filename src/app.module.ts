import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { HealthCheckController } from './controllers/health-check.controller';
import { UserController } from './controllers/user.controller';
import { typeOrmConfig } from './database/config/config';
import { RepositoryModule } from './repositories/repository.module';
import { UseCaseModule } from './use-cases/use-case-module';
import { AuthController } from './controllers/auth.controller';
import { SchedulingController } from './controllers/scheduling.controller';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    RepositoryModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    UseCaseModule,
  ],
  controllers: [
    AuthController,
    HealthCheckController,
    SchedulingController,
    UserController,
  ],
})
export class AppModule {}
