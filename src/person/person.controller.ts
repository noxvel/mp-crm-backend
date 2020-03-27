import { Controller, Get, Post, Body, Param, Query, Put, Delete } from '@nestjs/common';

import { PersonEntity } from './person.entity';
import { PersonService } from './person.service';

import { CreatePersonDto } from './dto';
import { PersonRO, PersonsRO } from './person.interface';

import {
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('person')
@Controller('person')
export class PersonController {
  
  constructor(private readonly personService: PersonService) {}
  
  @Get('list')
  async findAll(@Query() query): Promise<PersonsRO> {
    return await this.personService.findAll(query);
  }

  @ApiResponse({ status: 201, description: 'The contract has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post('create')
  public async create(@Body() dto: CreatePersonDto): Promise<PersonRO> {
    return this.personService.create(dto);
  }

  @ApiResponse({ status: 201, description: 'The contract has been successfully updated.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put('update/:id')
  public async update(@Param() params, @Body() dto: CreatePersonDto) {
    return this.personService.update(params.id, dto);
  }

  @ApiResponse({ status: 201, description: 'The contract has been successfully deleted.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete('delete/:id')
  async delete(@Param() params) {
    return this.personService.delete(params.id);
  }
}