import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginRequest } from '@app/microservices/use-service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() req: LoginRequest) {
    console.log(req);
    this.userService.login(req);
    return { token: 'token' };
  }
}
