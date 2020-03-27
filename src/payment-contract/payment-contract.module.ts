import { Module } from '@nestjs/common';
import { PaymentContractController } from './payment-contract.controller';
import { PaymentContractService } from './payment-contract.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractEntity } from '../contract/contract.entity';
import { PaymentContractEntity } from './payment-contract.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContractEntity, PaymentContractEntity])],
  controllers: [PaymentContractController],
  providers: [PaymentContractService],
  exports: [PaymentContractService]
})
export class PaymentContractModule {}
