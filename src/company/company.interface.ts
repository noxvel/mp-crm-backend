import { CompanyEntity } from './company.entity'

interface CompanyDataRO {
  total: number;
  items: CompanyEntity[];
}

export interface CompanysRO {
  code: number;
  data: CompanyDataRO;
}

export interface CompanyRO {
  code: number;
  data: CompanyEntity;
}