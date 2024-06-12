import { RegisterRequest } from '@app/microservices/use-service';
import { IsDefined, IsEmail, Length, Matches } from 'class-validator';

export class RegisterDto implements RegisterRequest {
  @IsDefined({ message: '邮箱不能为空' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string;

  @IsDefined({ message: '用户名不能为空' })
  @Length(6, 8, { message: '用户名长度应介于6到8之间' })
  @Matches(new RegExp(/^[a-zA-Z0-9]+$/), {
    message: '用户名只能包含英文字符或数字',
  })
  username: string;

  @IsDefined({
    message: '密码不能为空',
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        '密码必须至少八位，且包含至少一个大写字母，一个小写字母，一个数字和一个特殊字符',
    },
  )
  password: string;
}
