import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { GetUserResponse } from './get-user.dto';
import { UserRequestWithId } from '@/src/@types/users';

@Injectable()
export class GetUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: UserRequestWithId): Promise<GetUserResponse> {
    const { id } = data.params;
    if (!id) {
      throw new HttpException('User ID is required', HttpStatus.BAD_REQUEST);
    }
    const response = await this.userRepository.findOneById(+id);
    if (!response) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
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
      status: HttpStatus.OK,
    };
  }
}
