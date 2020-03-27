import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonDto {
  @ApiProperty()
  readonly name: string;
  
  @ApiProperty()
  readonly inn: string;

  @ApiProperty()
  readonly phone: string;

  @ApiProperty()
  readonly birthdate: Date;
}