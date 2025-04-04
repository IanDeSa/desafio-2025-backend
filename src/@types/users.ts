import { CreateUserDto } from '../use-cases/user/create-user/create-user.dto';
import { HttpHeaderRequest } from './http-request';

export type RequestWithBodyAndHeaders<TBody> = {
  body: TBody;
  headers: HttpHeaderRequest;
};

export type RequestWithHeadersAndParams<TParams> = {
  headers: HttpHeaderRequest;
  params: TParams;
};

export type RequestWithHeaders<THeaders> = {
  headers: THeaders;
};

export type CreateUserRequest = RequestWithBodyAndHeaders<CreateUserDto>;

export type UserRequestWithId = RequestWithHeadersAndParams<{ id: number }>;
