import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  UserServiceController,
  UserServiceControllerMethods,
} from '@app/microservices/use-service';
import { Observable } from 'rxjs';

@Controller()
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  constructor(private readonly userService: UserService) {}
  async register(request: RegisterRequest): Promise<RegisterResponse> {
    try {
      const user = await this.userService.register(request);
      console.log(user);
      return {
        success: true,
        message: '注册成功',
      };
    } catch (error) {
      console.log(`Error name: ${error.name}`); // 错误名称
      console.log(`Error message: ${error.message}`); // 错误信息
      console.log(`Stack trace: ${error.stack}`); // 堆栈跟踪
      return {
        message: error.message,
        success: false,
      };
    }
  }

  login(
    request: LoginRequest,
  ): LoginResponse | Observable<LoginResponse> | Promise<LoginResponse> {
    console.log('login', request);
    return {
      token: 'ok',
    };
  }
}
