import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../../../database/models/user.entity';
import { UserRepository } from 'src/repositories/user.repository';
import * as bcrypt from 'bcryptjs';
import { CreateUserResponse } from './create-user.dto';
import { CreateUserRequest } from '@/src/@types/users';

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: CreateUserRequest): Promise<CreateUserResponse> {
    const user = new User();
    const userData = data.body;
    Object.assign(user, userData);

    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }

    try {
      const response = await this.userRepository.create(user);
      if (!response) {
        throw new HttpException(
          'User could not be created',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return {
        body: {
          id: response.id,
          name: response.name,
          email: response.email,
          role: response.role,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt,
        },
        status: HttpStatus.CREATED,
      };
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
