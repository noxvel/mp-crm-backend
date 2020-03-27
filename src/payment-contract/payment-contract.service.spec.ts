import { Test, TestingModule } from '@nestjs/testing';
import { PaymentContractService } from './payment-contract.service';

describe('PaymentContractService', () => {
  let service: PaymentContractService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentContractService],
    }).compile();

    service = module.get<PaymentContractService>(PaymentContractService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
