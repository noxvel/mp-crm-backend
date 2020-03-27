import { ContractEntity } from './contract.entity'

interface ContractsDataRO {
  total: number;
  items: ContractEntity[];
}

export interface ContractsRO {
  code: number;
  data: ContractsDataRO;
}

export interface ContractRO {
  code: number;
  data: ContractEntity;
}