import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { UserEntity } from './user.entity';
import {CreateUserDto, LoginUserDto, UpdateUserDto} from './dto';
// import { SECRET } from '../config';
import { UserRO } from './user.interface';
import { validate } from 'class-validator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import * as crypto from 'crypto';

// const jwt = require('jsonwebtoken');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const findOneOptions = {
      username: loginUserDto.name,
      password: crypto.createHmac('sha256', loginUserDto.password).digest('hex'),
    };

    return await this.userRepository.findOne(findOneOptions);
  }

  async findOneByName(name: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({name: name});
  }

  async create(dto: CreateUserDto): Promise<UserRO> {

    // check uniqueness of username/email
    const {name, email, password} = dto;
    const qb = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.name = :name', { name })
      .orWhere('user.email = :email', { email });

    const user = await qb.getOne();

    if (user) {
      const errors = {username: 'Username and email must be unique.'};
      throw new HttpException({message: 'Input data validation failed', errors}, HttpStatus.BAD_REQUEST);

    }

    // create new user
    const newUser = new UserEntity();
    newUser.name = name;
    newUser.email = email;
    newUser.password = password;

    const errors = await validate(newUser);
    if (errors.length > 0) {
      const _errors = {username: 'Userinput is not valid.'};
      throw new HttpException({message: 'Input data validation failed', _errors}, HttpStatus.BAD_REQUEST);

    } else {
      const savedUser = await this.userRepository.save(newUser);
      return this.buildUserRO(savedUser);
    }

  }

  // async update(id: number, dto: UpdateUserDto): Promise<UserEntity> {
  //   let toUpdate = await this.userRepository.findOne(id);
  //   delete toUpdate.password;
  //   delete toUpdate.favorites;

  //   let updated = Object.assign(toUpdate, dto);
  //   return await this.userRepository.save(updated);
  // }

  async delete(name: string): Promise<DeleteResult> {
    return await this.userRepository.delete({ name: name});
  }

  async findById(id: number): Promise<UserRO>{
    const user = await this.userRepository.findOne(id);

    if (!user) {
      const errors = {User: ' not found'};
      throw new HttpException({errors}, 401);
    };

    return this.buildUserRO(user);
  }

  async findByEmail(email: string): Promise<UserRO>{
    const user = await this.userRepository.findOne({email: email});
    return this.buildUserRO(user);
  }

  // public generateJWT(user) {
  //   let today = new Date();
  //   let exp = new Date(today);
  //   exp.setDate(today.getDate() + 60);

  //   return jwt.sign({
  //     id: user.id,
  //     user: user.name,
  //     email: user.email,
  //     exp: exp.getTime() / 1000,
  //   }, SECRET);
  // };

  // public async validateJWT(token) {
  //     return await jwt.verify(token, SECRET);
  // };

  private buildUserRO(user: UserEntity) {

    const userRO = {
      name: user.name,
      email: user.email,
      roles: user.roles,
      avatar: user.avatar
    };

    return userRO;
  }
}
