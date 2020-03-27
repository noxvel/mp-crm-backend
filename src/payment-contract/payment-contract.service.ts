import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentContractEntity } from './payment-contract.entity';
import { Repository, Like } from 'typeorm';
import { CreatePaymentContractDto } from './dto';
import { ContractEntity } from '../contract/contract.entity';
import {
  PaymentContractRO,
  PaymentsContractRO,
} from './payment-contract.interface';
import { SimpleResponse } from 'src/common.interface';

@Injectable()
export class PaymentContractService {
  constructor(
    @InjectRepository(PaymentContractEntity)
    private readonly paymentContractRepository: Repository<
      PaymentContractEntity
    >,
    @InjectRepository(ContractEntity)
    private readonly contractRepository: Repository<ContractEntity>,
  ) {}

  async findAll(config): Promise<PaymentsContractRO> {
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

    // let mps = await this.personRepository.find();

    return {
      code: 20000,
      data: {
        total: total,
        items: result,
      },
    };
  }

  async create(data: CreatePaymentContractDto): Promise<PaymentContractRO> {
    const p = new PaymentContractEntity();
    p.sum = data.sum;
    p.type = data.type;
    p.payDateTime = data.payDateTime && new Date(data.payDateTime);
    p.comment = data.comment;

    const contract = await this.contractRepository.findOne({
      where: { id: data.contract },
    });
    p.contract = contract;

    const newPaymentContract = await this.paymentContractRepository.save(p);

    // const author = await this.userRepository.findOne({ where: { id: userId } });

    // if (Array.isArray(author.articles)) {
    //   author.articles.push(article);
    // } else {
    //   author.articles = [article];
    // }

    // await this.userRepository.save(author);
    return {
      code: 20000,
      data: newPaymentContract,
    };
  }

  async update(id: number, data: any): Promise<PaymentContractRO> {
    const p = await this.paymentContractRepository.findOne({ id: id });

    p.sum = data.sum;
    p.type = data.type;
    p.comment = data.comment;
    p.payDateTime = data.payDateTime && new Date(data.payDateTime);

    const contract = await this.contractRepository.findOne({
      where: { id: data.contract },
    });
    p.contract = contract;

    const newPaymentContract = await this.paymentContractRepository.save(p);

    return {
      code: 20000,
      data: newPaymentContract,
    };
  }

  async delete(id: number): Promise<SimpleResponse> {
    try {
      await this.paymentContractRepository.delete({ id: id });
      return {
        code: 20000,
        message: 'PaymentContract succesufuly deleted',
      };
    } catch (error) {
      return {
        code: 50020,
        message: `Error try to delete person - ${error.message}`,
      };
    }
  }

  async findByContract(contractId: number): Promise<PaymentsContractRO> {
    const contract = await this.contractRepository.findOne(contractId);
    const [paymets, total] = await this.paymentContractRepository.findAndCount({
      where: {contract: contract},
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
