import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContractEntity } from './contract.entity';
import { PersonEntity } from '../person/person.entity';
import { ProgramEntity } from '../program/program.entity';
import { Repository, Like, DeleteResult } from 'typeorm';
import { CreateContractDto } from './dto';
import { ContractRO, ContractsRO } from './contract.interface';
import { SimpleResponse } from '../common.interface';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(ContractEntity)
    private readonly contractRepository: Repository<ContractEntity>,
    @InjectRepository(PersonEntity)
    private readonly personRepository: Repository<PersonEntity>,
    @InjectRepository(ProgramEntity)
    private readonly programRepository: Repository<ProgramEntity>,
  ) {}

  async findAll(config): Promise<ContractsRO> {
    const take = config.limit || 10;
    const skip = (config.page - 1) * config.limit || 0;
    const keyword = config.title || '';

    const order = config.sort === '-id' ? 'DESC' : 'ASC';

    // let result, total
    // if (keyword === '') {
    //   [result, total] = await this.contractRepository.findAndCount({
    //     // where: { name: Like('%' + keyword + '%') },
    //     order: { id: order },
    //     take: take,
    //     skip: skip,
    //   });
    // } else {
    const [result, total] = await this.contractRepository
      .createQueryBuilder('wsContract')
      // use plain `leftJoin` if you just need to check the condition, without fetching the whole `authenthication` entity into the result object
      // .leftJoinAndSelect('wsUser.authentication', 'authentication')
      .leftJoinAndSelect('wsContract.owner', 'person')
      .leftJoinAndSelect('wsContract.program', 'program')
      .leftJoinAndSelect('wsContract.payments', 'payment')
      // .where('authenthication.googleId = :googleId', { googleId })
      .where('person.name LIKE :keyword', { keyword: `%${keyword}%` })
      .orderBy('wsContract.id', order)
      .take(take)
      .skip(skip)
      // .getOne();
      .getManyAndCount();
    // }

    // let mps = await this.contractRepository.find();

    // const { importance, type, title, page = 1, limit = 15, sort } = config

    // let mps = mps.filter(item => {
    //   if (importance && item.importance !== +importance) return false
    //   if (type && item.type !== type) return false
    //   if (title && item.title.indexOf(title) < 0) return false
    //   return true
    // })

    // if (sort === '-id') {
    //   mps = mps.reverse()
    // }

    // const pageList = mps.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      code: 20000,
      data: {
        total: total,
        items: result,
      },
    };
  }

  async create(data: CreateContractDto): Promise<ContractRO> {
    const c = new ContractEntity();
    c.sum = data.sum;
    c.date = new Date(data.date);
    c.comment = data.comment;
    const program = await this.programRepository.findOne({
      where: { id: data.program },
    });
    const person = await this.personRepository.findOne({
      where: { id: data.owner },
    });
    // const program = await this.programRepository.findOne( data.program );
    // const person = await this.personRepository.findOne( data.owner );

    c.program = program;
    c.owner = person;

    const newContract = await this.contractRepository.save(c);

    // if (Array.isArray(person.contracts)) {
    //     person.contracts.push(c);
    //   } else {
    //       person.contracts = [c];
    // }
    // await this.personRepository.save(person);

    return {
      code: 20000,
      data: newContract,
    };
  }

  async update(id: number, data: any): Promise<ContractRO> {
    const c = await this.contractRepository.findOne({ id: id });

    c.sum = data.sum;
    c.date = new Date(data.date);
    c.comment = data.comment;
    const program = await this.programRepository.findOne({
      where: { id: data.program },
    });
    const person = await this.personRepository.findOne({
      where: { id: data.owner },
    });
    c.program = program;
    c.owner = person;

    const contract = await this.contractRepository.save(c);

    return {
      code: 20000,
      data: contract,
    };
  }

  async delete(id: number): Promise<SimpleResponse> {
    try {
      await this.contractRepository.delete({ id: id });
      return {
        code: 20000,
        message: 'Contract succesufuly deleted',
      };
    } catch (error) {
      return {
        code: 50020,
        message: `Error try to delete contract - ${error.message}`,
      };
    }
  }
}
