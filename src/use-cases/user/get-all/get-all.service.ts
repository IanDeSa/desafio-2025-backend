import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { GetUserResponseDto } from '../get-user/get-user.dto';

@Injectable()
export class GetAllUsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<GetUserResponseDto[]> {
    const response = await this.userRepository.findAll();
    return response.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }
}
