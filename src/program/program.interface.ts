import { ProgramEntity } from './program.entity'


export interface ProgramRO {
  code: number;
  data: ProgramData
}

export interface ProgramData {
  items: ProgramEntity[];
  total: number;
}
