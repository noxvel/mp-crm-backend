import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { ClientBaseEntity } from '../base-classes/client-base.entity';
import { AgreementEntity } from '../agreement/agreement.entity';

@Entity({ name: 'company' })
export class CompanyEntity extends ClientBaseEntity{

  @Column({ type: 'varchar', length: 20, default: '' })
  okpo: string;

  @OneToMany(type => AgreementEntity, agreement => agreement.company)
  agreements: AgreementEntity[];

}