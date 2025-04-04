import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Scheduling } from '../database/models';

@Injectable()
export class SchedulingRepository {
  constructor(
    @InjectRepository(Scheduling)
    private schedulingRepository: Repository<Scheduling>,
  ) {}

  async create(data: Scheduling): Promise<Scheduling> {
    return await this.schedulingRepository.save(data);
  }

  async findAllUserScheduling(
    options: FindManyOptions<Scheduling> | undefined,
  ): Promise<Scheduling[]> {
    return this.schedulingRepository.find(options);
  }
}
