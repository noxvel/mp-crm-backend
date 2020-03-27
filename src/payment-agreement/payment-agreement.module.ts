import { Module } from '@nestjs/common';
import { PaymentAgreementController } from './payment-agreement.controller';
import { PaymentAgreementService } from './payment-agreement.service';

@Module({
  controllers: [PaymentAgreementController],
  providers: [PaymentAgreementService]
})
export class PaymentAgreementModule {}
