import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty()
  readonly name: string;
  
  @ApiProperty()
  readonly okpo: string;
}