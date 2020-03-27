import { PaymentContractEntity } from './payment-contract.entity'

interface PaymentContractsDataRO {
  total: number;
  items: PaymentContractEntity[];
}

export interface PaymentsContractRO {
  code: number;
  data: PaymentContractsDataRO;
}

export interface PaymentContractRO {
  code: number;
  data: PaymentContractEntity;
}