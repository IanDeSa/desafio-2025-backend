import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../../../database/models/user.entity';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userData: Partial<User>): Promise<User> {
    const user = new User();
    Object.assign(user, userData);
    try {
      const response = await this.userRepository.create(user);
      if (!response) {
        throw new HttpException(
          'User could not be created',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return response;
    } catch (error) {
      if (error.sqlMessage.includes('Duplicate entry')) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        error.sqlMessage || 'User could not be created',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
