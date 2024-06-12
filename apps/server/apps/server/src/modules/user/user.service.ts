import {
  LoginRequest,
  USER_PACKAGE_NAME,
  USER_SERVICE_NAME,
  UserServiceClient,
} from '@app/microservices/use-service';
import {
  HttpException,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { RegisterDto } from './dto/register.dto';
import { map } from 'rxjs';

@Injectable()
export class UserService implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(@Inject(USER_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.userService =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
    console.log('userService', this.userService);
  }

  async register(req: RegisterDto) {
    const res = await this.userService.register(req);
    return res.pipe(
      // tap((res) => console.log(res)),
      map((res) => {
        const { success, message } = res;
        console.log('register', success, message);
        if (!success) {
          throw new HttpException(message, 400);
        }
        return success;
      }),
    );
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
}
