import { Entity, Column, ManyToOne } from 'typeorm';
import { TreatyBaseEntity } from '../base-classes/treaty-base.entity';
import { CompanyEntity } from '../company/company.entity';

@Entity({ name: 'agreement' })
export class AgreementEntity extends TreatyBaseEntity{

  @ManyToOne(type => CompanyEntity, company => company.agreements)
  company: CompanyEntity

}