import { Controller, Get, Post, Body, Param, Query, Request, Put, Delete } from '@nestjs/common';

import { PaymentContractEntity } from './payment-contract.entity';
import { PaymentContractService } from './payment-contract.service';

import { CreatePaymentContractDto } from './dto';
import { PaymentContractRO, PaymentsContractRO} from './payment-contract.interface';

import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('payment-contract')
@Controller('payment-contract')
export class PaymentContractController {
  
  constructor(private readonly paymentContractService: PaymentContractService) {}
  
  @Get('list')
  async findAll(@Query() query): Promise<PaymentsContractRO> {
    return await this.paymentContractService.findAll(query);
  }

  @ApiResponse({ status: 201, description: 'The contract has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post('create')
  public async create(@Body() dto: CreatePaymentContractDto): Promise<PaymentContractRO> {
    return this.paymentContractService.create(dto);
  }

  @ApiResponse({ status: 201, description: 'The contract has been successfully updated.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put('update/:id')
  public async update(@Param() params, @Body() dto: CreatePaymentContractDto) {
    return this.paymentContractService.update(params.id, dto);
  }

  @ApiResponse({ status: 201, description: 'The contract has been successfully deleted.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete('delete/:id')
  async delete(@Param() params) {
    return this.paymentContractService.delete(params.id);
  }

}