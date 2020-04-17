import { Entity, ManyToOne } from 'typeorm';
import { PaymentBaseEntity } from '../base-classes/payment-base.entity';
import { AgreementEntity } from '../agreement/agreement.entity';

@Entity({ name: 'payment_agreement' })
export class PaymentAgreementEntity extends PaymentBaseEntity{

  @ManyToOne(type => AgreementEntity, contract => contract.payments, {eager: true})
  treaty: AgreementEntity;

}