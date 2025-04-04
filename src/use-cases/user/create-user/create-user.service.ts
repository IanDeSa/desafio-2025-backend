import { Injectable } from '@nestjs/common';
import { User } from '../../../database/models/user.entity';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userData: Partial<User>): Promise<User> {
    const user = new User();
    Object.assign(user, userData);
    const response = await this.userRepository.create(user);
    return response;
  }
}
