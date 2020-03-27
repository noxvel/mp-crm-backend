import { PersonEntity } from './person.entity'

interface PersonDataRO {
  total: number;
  items: PersonEntity[];
}

export interface PersonsRO {
  code: number;
  data: PersonDataRO;
}

export interface PersonRO {
  code: number;
  data: PersonEntity;
}