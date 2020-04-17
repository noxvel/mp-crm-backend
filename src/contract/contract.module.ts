import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractEntity } from './contract.entity';
import { PersonEntity } from '../person/person.entity';
import { ProgramEntity } from '../program/program.entity';
import { PersonModule } from '../person/person.module';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports: [TypeOrmModule.forFeature([ContractEntity, PersonEntity, ProgramEntity]), PersonModule, PaymentModule],
  providers: [ContractService],
  controllers: [ContractController]
})
export class ContractModule {}
