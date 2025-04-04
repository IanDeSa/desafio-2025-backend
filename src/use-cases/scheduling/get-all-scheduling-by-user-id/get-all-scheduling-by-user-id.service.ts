import { SchedulingRepository } from '@/src/repositories/scheduling.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  GetAllSchedulingByUserIdRequestDto,
  GetAllSchedulingByUserIdResponseDto,
} from './get-all-scheduling-by-user-id.dto';
import { MoreThanOrEqual } from 'typeorm';

@Injectable()
export class GetAllShedulingByUserIdService {
  constructor(private readonly schedulingRepository: SchedulingRepository) {}

  async execute(
    schedulingData: GetAllSchedulingByUserIdRequestDto,
  ): Promise<GetAllSchedulingByUserIdResponseDto> {
    try {
      const response = await this.schedulingRepository.findAllUserScheduling({
        where: [
          {
            studentId: { id: schedulingData.userId },
            datetime: MoreThanOrEqual(new Date()),
          },
          {
            teacherId: { id: schedulingData.userId },
            datetime: MoreThanOrEqual(new Date()),
          },
        ],
        relations: ['studentId', 'teacherId'],
      });
      return {
        body: response,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        error.sqlMessage || 'Scheduling could not be searched',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
