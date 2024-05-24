import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { MICRO_SERVICE_CLIENT_PROXY } from '@app/public-module';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(MICRO_SERVICE_CLIENT_PROXY)
  private readonly userClient: ClientProxy;

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userClient.send('createUser', createUserDto);
  }

  @Get()
  findAll() {
    return this.userClient.send('findAllUser', {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
