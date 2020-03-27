import { Get, Post, Body, Put, Delete, Param, Controller, UsePipes, Query } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { UserRO, UserLogin, ResDataInfo } from './user.interface';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
// import { User } from './user.decorator';
// import { ValidationPipe } from '../shared/pipes/validation.pipe';

import {
  ApiTags,
  ApiBearerAuth
} from '@nestjs/swagger';

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

const codes = {
  ok: { code: 20000, msg: "All is good!" }
}

@ApiTags('user')
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }


  // @Get('user')
  // async findMe(@User('email') email: string): Promise<UserRO> {
  //   return await this.userService.findByEmail(email);
  // }

  @Get('user')
  async findMe(id: number): Promise<UserRO> {
    return await this.userService.findById(id);
  }


  // @Put('user')
  // async update(@User('id') userId: number, @Body('user') userData: UpdateUserDto) {
  //   return await this.userService.update(userId, userData);
  // }

  // @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  @Delete(':slug')
  async delete(@Param() params) {
    return await this.userService.delete(params.slug);
  }

  // @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<UserLogin> {
    const _user = await this.userService.findOne(loginUserDto);

    const errors = { User: ' not found' };
    if (!_user) throw new HttpException({ errors }, 401);

    // const token = await this.userService.generateJWT(_user);
    // const {email, username, bio, image} = _user;
    // const user = {email, token, username, bio, image};
    // return {user}

    // const { email, username, bio, image } = _user;
    // const user = { email, username, bio, image };
    const token = tokens.admin.token;
    return { data: { token: token }, code: codes.ok.code, message: codes.ok.msg };
  }

  @Get('info')
  async findUser(@Query() params): Promise<ResDataInfo> {
    // const user = await this.userService.findById(params.token);

    const userInfo = { code: codes.ok.code, message: codes.ok.msg, data: users['admin-token'] }
    return userInfo;
  }

  @Post('logout')
  async logout() {
    return { code: 20000, data: 'success' };
  }

}
