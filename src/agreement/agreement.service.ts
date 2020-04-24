import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AgreementEntity } from './agreement.entity';
import { CompanyEntity } from '../company/company.entity';
import { ProgramEntity } from '../program/program.entity';
import { Repository, Like, DeleteResult } from 'typeorm';
import { CreateAgreementDto } from './dto';
import { AgreementRO, AgreementsRO } from './agreement.interface';
import { SimpleResponse } from '../common.interface';

@Injectable()
export class AgreementService {
  constructor(
    @InjectRepository(AgreementEntity)
    private readonly agreementRepository: Repository<AgreementEntity>,
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
    @InjectRepository(ProgramEntity)
    private readonly programRepository: Repository<ProgramEntity>,
  ) {}

  async findAll(config): Promise<AgreementsRO> {
    const take = config.limit || 10;
    const skip = (config.page - 1) * config.limit || 0;
    const keyword = config.title || '';

    const order = config.sort === '-id' ? 'DESC' : 'ASC';

    const [result, total] = await this.agreementRepository
      .createQueryBuilder('wsAgreement')
      // use plain `leftJoin` if you just need to check the condition, without fetching the whole `authenthication` entity into the result object
      // .leftJoinAndSelect('wsUser.authentication', 'authentication')
      .leftJoinAndSelect('wsAgreement.owner', 'company')
      .leftJoinAndSelect('wsAgreement.program', 'program')
      .leftJoinAndSelect('wsAgreement.payments', 'payment')
      // .where('authenthication.googleId = :googleId', { googleId })
      .where('company.name LIKE :keyword', { keyword: `%${keyword}%` })
      .orderBy('wsAgreement.id', order)
      .take(take)
      .skip(skip)
      // .getOne();
      .getManyAndCount();

    return {
      code: 20000,
      data: {
        total: total,
        items: result,
      },
    };
  }

  async create(data: CreateAgreementDto): Promise<AgreementRO> {
    const c = new AgreementEntity();
    c.sum = data.sum;
    c.date = new Date(data.date);
    c.comment = data.comment;
    const program = await this.programRepository.findOne({
      where: { id: data.program },
    });
    const company = await this.companyRepository.findOne({
      where: { id: data.owner },
    });

    c.program = program;
    c.owner = company;

    const newAgreement = await this.agreementRepository.save(c);

    return {
      code: 20000,
      data: newAgreement,
    };
  }

  async update(id: number, data: any): Promise<AgreementRO> {
    const c = await this.agreementRepository.findOne({ id: id });

    c.sum = data.sum;
    c.date = new Date(data.date);
    c.comment = data.comment;
    const program = await this.programRepository.findOne({
      where: { id: data.program },
    });
    const company = await this.companyRepository.findOne({
      where: { id: data.owner },
    });
    c.program = program;
    c.owner = company;

    const agreement = await this.agreementRepository.save(c);

    return {
      code: 20000,
      data: agreement,
    };
  }

  async delete(id: number): Promise<SimpleResponse> {
    try {
      await this.agreementRepository.delete({ id: id });
      return {
        code: 20000,
        message: 'Agreement succesufuly deleted',
      };
    } catch (error) {
      return {
        code: 50020,
        message: `Error try to delete agreement - ${error.message}`,
      };
    }
  }
}
