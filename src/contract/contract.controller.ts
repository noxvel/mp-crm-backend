import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common';

import { ContractService } from './contract.service';
import { CreateContractDto } from './dto';
import { ContractRO, ContractsRO } from './contract.interface';
import { PaymentContractService } from '../payment/payment.service';

import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('contract')
@Controller('contract')
export class ContractController {
  constructor(
    private readonly contractService: ContractService,
    private readonly paymentService: PaymentContractService,
  ) {}

  @Get('list')
  async findAll(@Query() query): Promise<ContractsRO> {
    return await this.contractService.findAll(query);
  }

  @ApiResponse({
    status: 201,
    description: 'The contract has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post('create')
  public async create(@Body() dto: CreateContractDto): Promise<ContractRO> {
    return this.contractService.create(dto);
  }

  @ApiResponse({
    status: 201,
    description: 'The contract has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put('update/:id')
  public async update(@Param() params, @Body() dto: CreateContractDto) {
    return this.contractService.update(params.id, dto);
  }

  @ApiResponse({
    status: 201,
    description: 'The contract has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete('delete/:id')
  async delete(@Param() params) {
    return this.contractService.delete(params.id);
  }

  @ApiResponse({
    status: 201,
    description: 'The payments has been successfully finded.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get(':id/paymets')
  async findPayments(@Param() params) {
    return this.paymentService.findByTreatyId(params.id);
  }
}
