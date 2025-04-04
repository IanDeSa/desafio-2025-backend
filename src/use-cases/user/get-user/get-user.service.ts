import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { GetUserResponseDto } from './get-user.dto';

@Injectable()
export class GetUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<GetUserResponseDto | null> {
    const response = await this.userRepository.findOneById(id);
    if (!response) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return {
      id: response.id,
      name: response.name,
      email: response.email,
      role: response.role,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
    };
  }
}
