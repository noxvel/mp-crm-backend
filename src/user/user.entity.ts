import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, JoinTable, ManyToMany, OneToMany} from "typeorm";
import { IsEmail, Validate } from 'class-validator';
import * as crypto from 'crypto';

@Entity('user')
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({default: ''})
  // @IsEmail()
  email: string;

  @Column({default: ''})
  avatar: string;

  @Column()
  password: string;

  @BeforeInsert()
  hashPassword() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }

}
