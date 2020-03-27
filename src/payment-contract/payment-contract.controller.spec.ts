import { Test, TestingModule } from '@nestjs/testing';
import { PaymentContractController } from './payment-contract.controller';

describe('PaymentContract Controller', () => {
  let controller: PaymentContractController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentContractController],
    }).compile();

    controller = module.get<PaymentContractController>(PaymentContractController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
