import { Controller, Get, Post, Body, Param, Query, Request, UseGuards } from '@nestjs/common';

import { ProgramEntity } from './program.entity';
import { ProgramService } from './program.service';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { CreateProgramDto } from './dto';
import { ProgramRO } from './program.interface';

import {
  ApiTags,
  ApiBearerAuth
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('program')
@Controller('program')
export class ProgramController {
  
  constructor(private readonly programService: ProgramService) {}

  @Get('list')
  async findAll(@Query() query): Promise<ProgramRO> {
    return await this.programService.findAll(query);
  }

  @Post()
  public async post(@Body() dto: CreateProgramDto): Promise<ProgramEntity> {
    return this.programService.create(dto);
  }

}