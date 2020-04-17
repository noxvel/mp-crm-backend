import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Request,
  Put,
  Delete,
} from '@nestjs/common';

import { AgreementService } from './agreement.service';

import { CreateAgreementDto } from './dto';
import { AgreementRO, AgreementsRO } from './agreement.interface';
import { PaymentAgreementService} from 'src/payment/payment.service';

import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('agreement')
@Controller('agreement')
export class AgreementController {
  constructor(
    private readonly agreementService: AgreementService,
    private readonly paymentService: PaymentAgreementService,
  ) {}

  @Get('list')
  async findAll(@Query() query): Promise<AgreementsRO> {
    return await this.agreementService.findAll(query);
  }

  @ApiResponse({
    status: 201,
    description: 'The agreement has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post('create')
  public async create(@Body() dto: CreateAgreementDto): Promise<AgreementRO> {
    return this.agreementService.create(dto);
  }

  @ApiResponse({
    status: 201,
    description: 'The agreement has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put('update/:id')
  public async update(@Param() params, @Body() dto: CreateAgreementDto) {
    return this.agreementService.update(params.id, dto);
  }

  @ApiResponse({
    status: 201,
    description: 'The agreement has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete('delete/:id')
  async delete(@Param() params) {
    return this.agreementService.delete(params.id);
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
