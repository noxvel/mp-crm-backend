import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { ProgramModule } from './program/program.module';
import { Connection } from 'typeorm';
import { UserModule } from './user/user.module';
import { ContractModule } from './contract/contract.module';
import { AgreementModule } from './agreement/agreement.module';
import { PersonModule } from './person/person.module';
import { CompanyModule } from './company/company.module';
import { PaymentModule } from './payment/payment.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    // TypeOrmModule.forRoot({
    //   "type": "postgres",
    //   "host": "localhost",
    //   "port": 5432,
    //   "username": "postgres",
    //   "password": "1234",
    //   "database": "mp-crm",
    //   "synchronize": true,
    //   "logging": true,
    //   "entities": ["./**/*.entity{ .ts,.js}"]
    // }),
    ProgramModule,
    UserModule,
    ContractModule,
    AgreementModule,
    PersonModule,
    CompanyModule,
    PaymentModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {  
  constructor(private readonly connection: Connection) {}
}
