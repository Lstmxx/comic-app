import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginRequest } from '@app/microservices/use-service';
import { RegisterDto } from './dto/register.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() req: LoginRequest) {
    console.log(req);
    this.userService.login(req);
    return { token: 'token' };
  }

  @Post('register')
  async register(@Body() req: RegisterDto) {
    return this.userService.register(req);
  }
}
