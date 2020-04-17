import { ApiProperty } from '@nestjs/swagger';

export class CreateProgramDto {
  @ApiProperty()
  readonly name: string;
  
  @ApiProperty()
  readonly serialNumber: string;

  @ApiProperty()
  readonly cost: number

  @ApiProperty()
  readonly description: string;
}