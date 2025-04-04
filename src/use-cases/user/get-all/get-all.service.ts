import { HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { GetUserResponse } from './get-all.dto';

@Injectable()
export class GetAllUsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<GetUserResponse> {
    const response = await this.userRepository.findAll();
    return {
      body: response.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })),
      status: HttpStatus.OK,
    };
  }
}
