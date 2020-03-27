import { Test, TestingModule } from '@nestjs/testing';
import { PaymentAgreementController } from './payment-agreement.controller';

describe('PaymentAgreement Controller', () => {
  let controller: PaymentAgreementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentAgreementController],
    }).compile();

    controller = module.get<PaymentAgreementController>(PaymentAgreementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
