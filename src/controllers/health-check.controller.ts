import { Controller, Get } from '@nestjs/common';
import { HealthCheckService } from 'src/use-cases/health-check.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Health Check')
@Controller()
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @ApiOperation({
    summary: 'Check the health of the application',
    description: 'Returns the health status of the application.',
  })
  @Get()
  getHealthStatus(): { status: number; message: string } {
    return { status: 200, message: this.healthCheckService.getHealthCheck() };
  }
  getHello(): string {
    return this.healthCheckService.getHealthCheck();
  }
}
