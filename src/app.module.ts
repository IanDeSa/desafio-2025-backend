import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { HealthCheckController } from './controllers/health-check.controller';
import { UserController } from './controllers/user.controller';
import { typeOrmConfig } from './database/config/config';
import { RepositoryModule } from './repositories/repository.module';
import { UseCaseModule } from './use-cases/use-case-module';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    RepositoryModule,
    UseCaseModule,
  ],
  controllers: [AuthController, HealthCheckController, UserController],
})
export class AppModule {}
