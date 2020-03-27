import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentContractDto {
  @ApiProperty()
  readonly sum: number;

  @ApiProperty()
  readonly type: string;

  @ApiProperty()
  readonly payDateTime: Date;
  
  @ApiProperty()
  readonly contract: number;

  @ApiProperty()
  readonly comment: string;
}