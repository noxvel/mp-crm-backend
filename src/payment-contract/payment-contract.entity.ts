import { Entity, ManyToOne } from 'typeorm';
import { PaymentBaseEntity } from '../base-classes/payment-base.entity';
import { ContractEntity } from '../contract/contract.entity';

@Entity({ name: 'payment_contract' })
export class PaymentContractEntity extends PaymentBaseEntity{

  @ManyToOne(type => ContractEntity, contract => contract.payments, {eager: true})
  contract: ContractEntity;

}