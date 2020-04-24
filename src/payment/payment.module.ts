import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService, PaymentContractService, PaymentAgreementService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractEntity } from '../contract/contract.entity';
import { PaymentContractEntity } from './payment-contract.entity';
import { AgreementEntity } from '../agreement/agreement.entity';
import { PaymentAgreementEntity } from './payment-agreement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContractEntity, AgreementEntity, PaymentContractEntity, PaymentAgreementEntity])],
  controllers: [PaymentController],
  providers: [PaymentContractService, PaymentAgreementService],
  exports: [PaymentContractService, PaymentAgreementService]
})
export class PaymentModule {}
