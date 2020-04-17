import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty()
  readonly sum: number;

  @ApiProperty()
  readonly type: string;

  @ApiProperty()
  readonly payDateTime: Date;
  
  @ApiProperty()
  readonly treaty: number;

  @ApiProperty()
  readonly comment: string;
}