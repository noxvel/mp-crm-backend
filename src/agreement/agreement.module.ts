import { Module } from '@nestjs/common';
import { AgreementService } from './agreement.service';
import { AgreementController } from './agreement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgreementEntity } from './agreement.entity';
import { CompanyEntity } from '../company/company.entity';
import { ProgramEntity } from '../program/program.entity';
import { CompanyModule } from '../company/company.module';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports: [TypeOrmModule.forFeature([AgreementEntity, CompanyEntity, ProgramEntity]), CompanyModule, PaymentModule],
  providers: [AgreementService],
  controllers: [AgreementController]
})
export class AgreementModule {}
