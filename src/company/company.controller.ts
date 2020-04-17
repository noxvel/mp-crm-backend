import { Controller, Get, Post, Body, Param, Query, Put, Delete } from '@nestjs/common';

import { CompanyService } from './company.service';

import { CreateCompanyDto } from './dto';
import { CompanyRO, CompanysRO } from './company.interface';

import {
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('company')
@Controller('company')
export class CompanyController {
  
  constructor(private readonly companyService: CompanyService) {}
  
  @Get('list')
  async findAll(@Query() query): Promise<CompanysRO> {
    return await this.companyService.findAll(query);
  }

  @ApiResponse({ status: 201, description: 'The contract has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post('create')
  public async create(@Body() dto: CreateCompanyDto): Promise<CompanyRO> {
    return this.companyService.create(dto);
  }

  @ApiResponse({ status: 201, description: 'The contract has been successfully updated.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put('update/:id')
  public async update(@Param() params, @Body() dto: CreateCompanyDto) {
    return this.companyService.update(params.id, dto);
  }

  @ApiResponse({ status: 201, description: 'The contract has been successfully deleted.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete('delete/:id')
  async delete(@Param() params) {
    return this.companyService.delete(params.id);
  }
}