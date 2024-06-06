import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@app/public-entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  // login(loginDto: LoginDto) {
  //   return 'This action logs a user in';
  // }

  // register(registerDto: RegisterDto) {
  //   return 'This action adds a new user';
  // }
}
