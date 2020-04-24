import { Get, Post, Body, Put, Delete, Param, Controller, Request, UsePipes, UseGuards, Query, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { UserRO, UserLogin, ResDataInfo, UsersRO } from './user.interface';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { ValidationPipe } from '../pipes/validation.pipe';
import { HttpStatus } from '@nestjs/common';

import {
  ApiTags,
  ApiBearerAuth
} from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
// @UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Get(':id')
  async findMe(@Param() params): Promise<UserRO> {
    return await this.userService.findById(params.id);
  }

  @Get('list')
  async findAll(): Promise<UsersRO> {
    const users = await this.userService.findAll();

    return { users: users}
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

  @Delete(':id')
  async delete(@Param() params) {
    return await this.userService.delete(params.id);
  }

}
