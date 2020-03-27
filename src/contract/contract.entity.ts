import { Entity, OneToMany, ManyToOne } from 'typeorm';
import { TreatyBaseEntity } from '../base-classes/treaty-base.entity';
import { PersonEntity } from '../person/person.entity';
import { PaymentContractEntity } from '../payment-contract/payment-contract.entity'

@Entity({ name: 'contract' })
export class ContractEntity extends TreatyBaseEntity{

  @ManyToOne(type => PersonEntity, owner => owner.contracts, {eager: true})
  owner: PersonEntity;

  @OneToMany(type => PaymentContractEntity, payment => payment.contract)
  payments: PaymentContractEntity[];
}