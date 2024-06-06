import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import {
  LoginRequest,
  LoginResponse,
  UserServiceController,
  UserServiceControllerMethods,
} from '@app/microservices/use-service';
import { Observable } from 'rxjs';

@Controller()
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  constructor(private readonly userService: UserService) {}

  login(
    request: LoginRequest,
  ): LoginResponse | Observable<LoginResponse> | Promise<LoginResponse> {
    console.log('login', request);
    return {
      token: 'ok',
    };
  }
}
