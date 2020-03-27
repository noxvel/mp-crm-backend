import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonEntity } from './person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonEntity])],
  providers: [PersonService],
  controllers: [PersonController]
})
export class PersonModule {}
