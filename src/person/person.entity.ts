import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { ClientBaseEntity } from '../base-classes/client-base.entity';
import { ContractEntity } from '../contract/contract.entity';

@Entity({ name: 'person' })
export class PersonEntity extends ClientBaseEntity{

  @Column({ type: 'date' , default: '1970-01-01'})
  birthdate: Date

  @Column({ type: 'varchar', length: 20, default: '' })
  inn: string;

  @Column({ type: 'varchar', length: 20, default: '' })
  phone: string;

  @OneToMany(type => ContractEntity, contract => contract.owner)
  contracts: ContractEntity[];

}