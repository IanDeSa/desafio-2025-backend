import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EntitiesModule } from './entities/entities.module';
import { HealthCheckController } from './controllers/health-check.controller';
import { HealthCheckService } from './use-cases/health-check.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'database',
      entities: [],
    }),
    EntitiesModule,
  ],
  controllers: [HealthCheckController],
  providers: [HealthCheckService],
})
export class AppModule {}
