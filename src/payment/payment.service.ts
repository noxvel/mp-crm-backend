import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentContractEntity } from './payment-contract.entity';
import { PaymentAgreementEntity } from './payment-agreement.entity';
import { Repository, Like } from 'typeorm';
import { CreatePaymentDto } from './dto';
import { ContractEntity } from '../contract/contract.entity';
import { AgreementEntity } from '../agreement/agreement.entity';
import { PaymentRO, PaymentsRO } from './payment.interface';
import { SimpleResponse } from 'src/common.interface';

export interface PaymentService {
  findAll(config): Promise<PaymentsRO>
  create(data: CreatePaymentDto): Promise<PaymentRO>
  update(id: number, data: any): Promise<PaymentRO>
  delete(id: number): Promise<SimpleResponse>
  findByTreatyId(id: number): Promise<PaymentsRO>
}

@Injectable()
export class PaymentContractService implements PaymentService{
  constructor(
    @InjectRepository(PaymentContractEntity)
    private readonly paymentContractRepository: Repository<
      PaymentContractEntity
    >,
    @InjectRepository(ContractEntity)
    private readonly contractRepository: Repository<ContractEntity>
  ) {}

  async findAll(config): Promise<PaymentsRO> {
    const take = config.limit || 10;
    const skip = (config.page - 1) * config.limit || 0;
    const keyword = config.title || '';

    const order = config.sort === '-id' ? 'DESC' : 'ASC';
    const [result, total] = await this.paymentContractRepository.findAndCount({
      where: { name: Like('%' + keyword + '%') },
      order: { id: order },
      take: take,
      skip: skip,
    });

    return {
      code: 20000,
      data: {
        total: total,
        items: result,
      },
    };
  }

  async create(data: CreatePaymentDto): Promise<PaymentRO> {
    const p = new PaymentContractEntity();
    p.sum = data.sum;
    p.type = data.type;
    p.payDateTime = data.payDateTime && new Date(data.payDateTime);
    p.comment = data.comment;

    const contract = await this.contractRepository.findOne({
      where: { id: data.treaty },
    });
    p.treaty = contract;

    const newPayment = await this.paymentContractRepository.save(p);

    return {
      code: 20000,
      data: newPayment,
    };
  }

  async update(id: number, data: any): Promise<PaymentRO> {

    const p = await this.paymentContractRepository.findOne({ id: id });

    p.sum = data.sum;
    p.type = data.type;
    p.comment = data.comment;
    p.payDateTime = data.payDateTime && new Date(data.payDateTime);

    const contract = await this.contractRepository.findOne({
      where: { id: data.contract },
    });
    p.treaty = contract;

    const newPayment = await this.paymentContractRepository.save(p);

    return {
      code: 20000,
      data: newPayment,
    };
  }

  async delete(id: number): Promise<SimpleResponse> {
    try {
      await this.paymentContractRepository.delete({ id: id });
      return {
        code: 20000,
        message: 'Payment succesufuly deleted',
      };
    } catch (error) {
      return {
        code: 50020,
        message: `Error try to delete payment - ${error.message}`,
      };
    }
  }

  async findByTreatyId(id: number): Promise<PaymentsRO> {
    const contract = await this.contractRepository.findOne(id);
    const [paymets, total] = await this.paymentContractRepository.findAndCount({
      where: { treaty: contract },
      order: { payDateTime: 'ASC' },
    });

    return {
      code: 20000,
      data: {
        total: total,
        items: paymets,
      },
    };
  }

}

@Injectable()
export class PaymentAgreementService implements PaymentService{
  constructor(
    @InjectRepository(PaymentAgreementEntity)
    private readonly paymentAgreementRepository: Repository<
      PaymentAgreementEntity
    >,
    @InjectRepository(AgreementEntity)
    private readonly agreementRepository: Repository<AgreementEntity>,
  ) {}


  async findAll(config): Promise<PaymentsRO> {
    const take = config.limit || 10;
    const skip = (config.page - 1) * config.limit || 0;
    const keyword = config.title || '';

    const order = config.sort === '-id' ? 'DESC' : 'ASC';
    const [result, total] = await this.paymentAgreementRepository.findAndCount({
      where: { name: Like('%' + keyword + '%') },
      order: { id: order },
      take: take,
      skip: skip,
    });

    return {
      code: 20000,
      data: {
        total: total,
        items: result,
      },
    };
  }

  async create(data: CreatePaymentDto): Promise<PaymentRO> {
    const p = new PaymentAgreementEntity();
    p.sum = data.sum;
    p.type = data.type;
    p.payDateTime = data.payDateTime && new Date(data.payDateTime);
    p.comment = data.comment;

    const contract = await this.agreementRepository.findOne({
      where: { id: data.treaty },
    });
    p.treaty = contract;

    const newPayment = await this.paymentAgreementRepository.save(p);

    return {
      code: 20000,
      data: newPayment,
    };
  }

  async update(id: number, data: any): Promise<PaymentRO> {

    const p = await this.paymentAgreementRepository.findOne({ id: id });

    p.sum = data.sum;
    p.type = data.type;
    p.comment = data.comment;
    p.payDateTime = data.payDateTime && new Date(data.payDateTime);

    const contract = await this.agreementRepository.findOne({
      where: { id: data.contract },
    });
    p.treaty = contract;

    const newPayment = await this.paymentAgreementRepository.save(p);

    return {
      code: 20000,
      data: newPayment,
    };
  }

  async delete(id: number): Promise<SimpleResponse> {
    try {
      await this.paymentAgreementRepository.delete({ id: id });
      return {
        code: 20000,
        message: 'Payment succesufuly deleted',
      };
    } catch (error) {
      return {
        code: 50020,
        message: `Error try to delete payment - ${error.message}`,
      };
    }
  }

  async findByTreatyId(id: number): Promise<PaymentsRO> {
    const agreement = await this.agreementRepository.findOne(id);
    const [paymets, total] = await this.paymentAgreementRepository.findAndCount(
      {
        where: { contract: agreement },
        order: { payDateTime: 'ASC' },
      },
    );

    return {
      code: 20000,
      data: {
        total: total,
        items: paymets,
      },
    };
  }
}