import { Controller, Get, Post, Body, Param, Query, UseGuards, Put, Delete } from '@nestjs/common';

import { PaymentService, PaymentContractService, PaymentAgreementService } from './payment.service';

import { CreatePaymentDto } from './dto';
import { PaymentRO, PaymentsRO} from './payment.interface';
import { HttpStatus } from '@nestjs/common';
import { HttpException } from "@nestjs/common/exceptions/http.exception";

import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiParam,
  ApiOperation,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  private currentPaymentService: PaymentService;
  
  constructor(private readonly paymentContractService: PaymentContractService, private readonly paymentAgreementService: PaymentAgreementService) {}

  @Get(':kind/list')
  @ApiParam({ name: 'kind', required: true })
  async findAll(@Param() params, @Query() query): Promise<PaymentsRO> {
    this.currentPaymentService = await this.selectService(params.kind);
    return await this.currentPaymentService.findAll(query);
  }

  @ApiResponse({ status: 201, description: 'The contract has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post(':kind/create')
  @ApiParam({ name: 'kind', required: true })
  public async create(@Param() params, @Body() dto: CreatePaymentDto): Promise<PaymentRO> {
    this.currentPaymentService = await this.selectService(params.kind);
    return this.currentPaymentService.create(dto);
  }

  @ApiResponse({ status: 201, description: 'The contract has been successfully updated.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put(':kind/update/:id')
  @ApiParam({ name: 'kind', required: true })
  @ApiParam({ name: 'id', required: true })
  public async update(@Param() params, @Body() dto: CreatePaymentDto) {
    this.currentPaymentService = await this.selectService(params.kind);
    return this.currentPaymentService.update(params.id, dto);
  }

  @ApiResponse({ status: 201, description: 'The contract has been successfully deleted.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':kind/delete/:id')
  @ApiParam({ name: 'kind', required: true })
  @ApiParam({ name: 'id', required: true })
  async delete(@Param() params) {
    this.currentPaymentService = await this.selectService(params.kind);
    return this.currentPaymentService.delete(params.id);
  }

  private async selectService(kind: string): Promise<PaymentService>{
    switch (kind) {
      case 'contract': {
        return this.currentPaymentService = this.paymentContractService;
            }
      case 'agreement': { 
        return  this.currentPaymentService = this.paymentAgreementService;
      }
      default: {
        throw new HttpException('FollowerId and username not provided.', HttpStatus.BAD_REQUEST);
      }
    }
  }
}