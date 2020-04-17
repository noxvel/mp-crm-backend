import { AgreementEntity } from './agreement.entity'

interface AgreementsDataRO {
  total: number;
  items: AgreementEntity[];
}

export interface AgreementsRO {
  code: number;
  data: AgreementsDataRO;
}

export interface AgreementRO {
  code: number;
  data: AgreementEntity;
}