import { Test, TestingModule } from '@nestjs/testing';
import { PaymentAgreementService } from './payment-agreement.service';

describe('PaymentAgreementService', () => {
  let service: PaymentAgreementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentAgreementService],
    }).compile();

    service = module.get<PaymentAgreementService>(PaymentAgreementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
