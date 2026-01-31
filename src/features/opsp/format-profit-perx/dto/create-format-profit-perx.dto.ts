import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFormatProfitPerXDto {
  @ApiProperty({ example: '1' })
  @IsString()
  id_company: string;

  @ApiProperty({ example: '1', required: false })
  @IsString()
  id_entity?: string;
  
  @ApiProperty({ example: 'Ganancia por cliente' })
  @IsString()
  profit_per_x_definition: string;

  @ApiProperty({ example: '13474' })
  @IsString()
  created_by: string;
}
