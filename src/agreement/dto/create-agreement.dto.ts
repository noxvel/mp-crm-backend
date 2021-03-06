import { ApiProperty } from '@nestjs/swagger';

export class CreateAgreementDto {
  @ApiProperty()
  readonly sum: number;

  @ApiProperty()
  readonly date: Date;
  
  @ApiProperty()
  readonly owner: number;

  @ApiProperty()
  readonly program: number;

  @ApiProperty()
  readonly comment: string;
}