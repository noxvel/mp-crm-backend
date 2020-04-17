import { PaymentBaseEntity } from '../base-classes/payment-base.entity'

interface PaymentsDataRO {
  total: number;
  items: PaymentBaseEntity[];
}

export interface PaymentsRO {
  code: number;
  data: PaymentsDataRO;
}

export interface PaymentRO {
  code: number;
  data: PaymentBaseEntity;
}