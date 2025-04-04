import { SchedulingRepository } from '@/src/repositories/scheduling.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateSchedulingDto,
  CreateSchedulingResponse,
} from './create-scheduling.dto';
import { Scheduling } from '@/src/database/models';

@Injectable()
export class CreateShedulingService {
  constructor(private readonly schedulingRepository: SchedulingRepository) {}

  async execute(
    schedulingData: CreateSchedulingDto,
  ): Promise<CreateSchedulingResponse> {
    const scheduling = new Scheduling();
    Object.assign(scheduling, schedulingData);

    try {
      const response = await this.schedulingRepository.create(scheduling);
      if (!response) {
        throw new HttpException(
          'Scheduling could not be created',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return {
        body: response,
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(
        error.sqlMessage || 'Scheduling could not be created',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
