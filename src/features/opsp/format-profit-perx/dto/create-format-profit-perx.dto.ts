import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFormatProfitPerXDto {
  @ApiProperty({ example: 'BANRURAL_GT' })
  @IsString()
  id_company: string;

  @ApiProperty({ example: 'Ganancia por cliente' })
  @IsString()
  profit_per_x_definition: string;

  @ApiProperty({ example: 'admin_user' })
  @IsString()
  created_by: string;
}
