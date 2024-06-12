import { YES_OR_NO } from '@app/constant';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 50,
    comment: '用户名',
    nullable: false,
  })
  username: string;

  @Column({
    length: 50,
    comment: '头像',
    default: '',
  })
  avatar: string;

  @Column({
    length: 50,
    comment: '邮箱',
    unique: true,
  })
  email: string;

  @Column({
    type: 'char',
    length: 60,
    comment: '密码',
    nullable: false,
  })
  password: string;

  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date;

  @Column({
    type: 'enum',
    enum: YES_OR_NO,
    comment: '是否删除',
    default: YES_OR_NO.NO,
  })
  isDelete: string;
}
