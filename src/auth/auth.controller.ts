import { Get, Post, Body, Put, Delete, Param, Controller, Request, UsePipes, UseGuards, Query, Headers } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from '../user/user.service';
import { UserRO, UserLogin, ResDataInfo, UsersRO } from '../user/user.interface';

import {
  ApiTags,
  ApiBearerAuth
} from '@nestjs/swagger';

const codes = {
  ok: { code: 20000, msg: "All is good!" }
}

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(private readonly userService: UserService, private readonly authService: AuthService) { }

  // // @UsePipes(new ValidationPipe())
  // @Post('login')
  // async login(@Body() loginUserDto: LoginUserDto): Promise<UserLogin> {
  //   const _user = await this.userService.findOne(loginUserDto);

  //   const errors = { User: ' not found' };
  //   if (!_user) throw new HttpException({ errors }, 401);

  //   const token = await this.userService.generateJWT(_user);
  //   return { data: { token: token }, code: codes.ok.code, message: codes.ok.msg };
  // }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log(req.user)
    const token = await this.authService.login(req.user);
    return { data: { token: token }, code: codes.ok.code, message: codes.ok.msg };
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('info')
  async findUser(@Request() req) {
    console.log(req.user)
    const user = await this.userService.findById(req.user.id);

    // let userToken;
    // try {
    //   userToken = await this.userService.validateJWT(headers['authorization']);
    // } catch(err) {
    //   throw new HttpException('Follower token is expired.', HttpStatus.BAD_REQUEST);
    // }
    // const userInfo = { code: codes.ok.code, message: codes.ok.msg, data: users[userToken.name]}

    return { code: codes.ok.code, message: codes.ok.msg, data: user}
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout() {
    return { code: 20000, data: 'success' };
  }

}
