import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../../../database/models/user.entity';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class GetUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<User | null> {
    const response = await this.userRepository.findOneById(id);
    if (!response) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return response;
  }
}
