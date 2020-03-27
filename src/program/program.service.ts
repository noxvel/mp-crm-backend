import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramEntity } from './program.entity';
import { Repository } from 'typeorm';
import { CreateProgramDto } from './dto';
import { ProgramRO } from './program.interface'

@Injectable()
export class ProgramService {

  constructor(@InjectRepository(ProgramEntity) private readonly programRepository: Repository<ProgramEntity>) { }

  async findAll(config): Promise<ProgramRO> {
    let mps = await this.programRepository.find();

    const { importance, type, title, page = 1, limit = 15, sort } = config

    // let mps = mps.filter(item => {
    //   if (importance && item.importance !== +importance) return false
    //   if (type && item.type !== type) return false
    //   if (title && item.title.indexOf(title) < 0) return false
    //   return true
    // })

    if (sort === '-id') {
      mps = mps.reverse()
    }

    const pageList = mps.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      code: 20000,
      data: {
        total: mps.length,
        items: pageList
      }
    }

  }

  async create(mpData: CreateProgramDto): Promise<ProgramEntity> {

    const p = new ProgramEntity();
    p.name = mpData.name;
    p.serialNumber = mpData.serialNumber;
    p.description = mpData.description;

    const newP = await this.programRepository.save(p);

    // const author = await this.userRepository.findOne({ where: { id: userId } });

    // if (Array.isArray(author.articles)) {
    //   author.articles.push(article);
    // } else {
    //   author.articles = [article];
    // }

    // await this.userRepository.save(author);

    return newP;

  }

}