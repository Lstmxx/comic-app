import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@app/public-entity';
import { LoginRequest, RegisterRequest } from '@app/microservices/use-service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  async validateRegisterHasUser(username: string, email: string) {
    const user = await this.userRepository.findOne({
      where: {
        username,
        email,
      },
    });

    console.log('user', user);

    if (user) {
      throw new Error(user.email === email ? '邮箱已被注册' : '用户名已被注册');
    }
  }

  async encodePassword(password: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hashSync(password, salt);
  }

  async createUser(request: RegisterRequest) {
    const user = new User();
    user.username = request.username;
    user.email = request.email;
    user.password = await this.encodePassword(request.password);

    return await this.userRepository.save(user);
  }

  async register(request: RegisterRequest) {
    const { email, username } = request;

    await this.validateRegisterHasUser(username, email);

    const user = await this.createUser(request);

    return user;
  }

  validateLoginUser(user: User | null, email: string, password: string) {
    if (!user) {
      throw new Error('用户不存在');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error('密码错误');
    }
  }

  async login(request: LoginRequest) {
    const { email, password } = request;

    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    this.validateLoginUser(user, email, password);
  }
}
