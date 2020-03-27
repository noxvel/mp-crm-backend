import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramService } from './program.service';
import { ProgramController } from './program.controller';
import { ProgramEntity } from './program.entity';

@Module({

  imports: [TypeOrmModule.forFeature([ProgramEntity])],
  providers: [ProgramService],
  controllers: [ProgramController],
  exports: []

})
export class ProgramModule {}