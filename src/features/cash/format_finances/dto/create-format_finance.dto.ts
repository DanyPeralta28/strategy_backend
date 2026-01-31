import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, MaxLength, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateCashFormatFinancesDto {
  @ApiProperty({ example: '1' })
  @IsString()
  @MaxLength(50)
  id_company: string;

  @ApiProperty({ type: 'array', example: [{ store_id: 1, score: 85 }] })
  @IsArray()
  @ArrayNotEmpty()
  evaluations_list: any[];

  @ApiProperty({ type: 'array', example: [{ attr: 'ROI', value: 0.23 }] })
  @IsArray()
  @ArrayNotEmpty()
  attributes_list: any[];

  @ApiProperty({ example: 1 })
  @IsInt()
  status: number;

  @ApiProperty({ example: '13474' })
  @IsString()
  @MaxLength(100)
  created_by: string;
}
