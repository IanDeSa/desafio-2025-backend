import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { GetUserResponse } from './get-user.dto';
import { UserRequestWithEmail } from '@/src/@types/users';

@Injectable()
export class GetUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: UserRequestWithEmail): Promise<GetUserResponse> {
    const { email } = data.params;
    if (!email) {
      throw new HttpException('User email is required', HttpStatus.BAD_REQUEST);
    }
    const response = await this.userRepository.findOneBy({
      where: { email },
    });
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
