import { Injectable } from '@nestjs/common';
import { User } from '../../../database/models/user.entity';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class GetAllUsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    const response = await this.userRepository.findAll();
    return response;
  }
}
