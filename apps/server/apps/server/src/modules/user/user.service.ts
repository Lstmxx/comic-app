import {
  LoginRequest,
  USER_PACKAGE_NAME,
  USER_SERVICE_NAME,
  UserServiceClient,
} from '@app/microservices/use-service';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class UserService implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(@Inject(USER_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    console.log('client', this.client);
    this.userService =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  async login(loginRequest: LoginRequest) {
    const data = await this.userService.login(loginRequest);

    data.subscribe({
      next: (value) => {
        console.log('next', value);
      },
      error: (error) => {
        console.log('error', error);
      },
      complete: () => {
        console.log('complete');
      },
    });
    return 'login';
  }

  async register() {
    return 'register';
  }
}
