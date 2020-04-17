import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from './company.entity';
import { Repository, Like } from 'typeorm';
import { CreateCompanyDto } from './dto';
import { CompanyRO, CompanysRO } from './company.interface'
import { SimpleResponse } from 'src/common.interface';

@Injectable()
export class CompanyService {

  constructor(@InjectRepository(CompanyEntity) private readonly companyRepository: Repository<CompanyEntity>) { }

  async findAll(config): Promise<CompanysRO> {

    const take = config.limit || 10
    const skip = (config.page - 1) * config.limit || 0
    const keyword = config.title || ''

    const order = (config.sort === '-id') ? 'DESC' : 'ASC'
    const [result, total] = await this.companyRepository.findAndCount(
      {
        where: { name: Like('%' + keyword + '%') }, 
        order: { id: order },
        take: take,
        skip: skip
      }
    );

    // let mps = await this.companyRepository.find();

    return {
      code: 20000,
      data: {
        total: total,
        items: result
      }
    }

  }

  async create(data: CreateCompanyDto): Promise<CompanyRO> {

    const p = new CompanyEntity();
    p.name = data.name;
    p.okpo = data.okpo;

    const newCompany = await this.companyRepository.save(p);

    // const author = await this.userRepository.findOne({ where: { id: userId } });

    // if (Array.isArray(author.articles)) {
    //   author.articles.push(article);
    // } else {
    //   author.articles = [article];
    // }

    // await this.userRepository.save(author);
    return {
      code: 20000,
      data: newCompany,
    };
  }


  async update(id: number, data: any): Promise<CompanyRO> {
    const p = await this.companyRepository.findOne({ id: id });

    p.name = data.name;
    p.okpo = data.okpo;

    const newCompany = await this.companyRepository.save(p);

    return {
      code: 20000,
      data: newCompany,
    };
  }

  async delete(id: number): Promise<SimpleResponse> {
    try {
      await this.companyRepository.delete({ id: id });
      return {
        code: 20000,
        message: 'Company succesufuly deleted'
      }
    } catch (error) {
      return {
        code: 50020,
        message: `Error try to delete company - ${error.message}`
      } 
    }
  }

}