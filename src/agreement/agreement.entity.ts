import { Entity, OneToMany, ManyToOne } from 'typeorm';
import { TreatyBaseEntity } from '../base-classes/treaty-base.entity';
import { CompanyEntity } from '../company/company.entity';
import { PaymentAgreementEntity } from '../payment/payment-agreement.entity'

@Entity({ name: 'agreement' })
export class AgreementEntity extends TreatyBaseEntity{

  @ManyToOne(type => CompanyEntity, owner => owner.agreements, {eager: true})
  owner: CompanyEntity

  @OneToMany(type => PaymentAgreementEntity, payment => payment.treaty)
  payments: PaymentAgreementEntity[];
}
