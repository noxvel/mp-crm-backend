import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonEntity } from './person.entity';
import { Repository, Like } from 'typeorm';
import { CreatePersonDto } from './dto';
import { PersonRO, PersonsRO } from './person.interface'
import { SimpleResponse } from 'src/common.interface';

@Injectable()
export class PersonService {

  constructor(@InjectRepository(PersonEntity) private readonly personRepository: Repository<PersonEntity>) { }

  async findAll(config): Promise<PersonsRO> {

    const take = config.limit || 10
    const skip = (config.page - 1) * config.limit || 0
    const keyword = config.title || ''

    const order = (config.sort === '-id') ? 'DESC' : 'ASC'
    const [result, total] = await this.personRepository.findAndCount(
      {
        where: { name: Like('%' + keyword + '%') }, 
        order: { id: order },
        take: take,
        skip: skip
      }
    );

    // let mps = await this.personRepository.find();

    return {
      code: 20000,
      data: {
        total: total,
        items: result
      }
    }

  }

  async create(data: CreatePersonDto): Promise<PersonRO> {

    const p = new PersonEntity();
    p.name = data.name;
    p.inn = data.inn;
    p.phone = data.phone;
    p.birthdate = new Date(data.birthdate);

    const newPerson = await this.personRepository.save(p);

    // const author = await this.userRepository.findOne({ where: { id: userId } });

    // if (Array.isArray(author.articles)) {
    //   author.articles.push(article);
    // } else {
    //   author.articles = [article];
    // }

    // await this.userRepository.save(author);
    return {
      code: 20000,
      data: newPerson,
    };
  }


  async update(id: number, data: any): Promise<PersonRO> {
    const p = await this.personRepository.findOne({ id: id });

    p.name = data.name;
    p.inn = data.inn;
    p.phone = data.phone;
    p.birthdate = new Date(data.birthdate);

    const newPerson = await this.personRepository.save(p);

    return {
      code: 20000,
      data: newPerson,
    };
  }

  async delete(id: number): Promise<SimpleResponse> {
    try {
      await this.personRepository.delete({ id: id });
      return {
        code: 20000,
        message: 'Person succesufuly deleted'
      }
    } catch (error) {
      return {
        code: 50020,
        message: `Error try to delete person - ${error.message}`
      } 
    }
  }

}