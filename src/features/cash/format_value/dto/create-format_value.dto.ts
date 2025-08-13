import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, MaxLength, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateCashFormatValueDto {
  @ApiProperty({ example: 'BANRURAL_GT' })
  @IsString()
  @MaxLength(50)
  id_company: string;

  @ApiProperty({ type: 'array', example: [{ area: 'Sales', weight: 0.4 }] })
  @IsArray()
  @ArrayNotEmpty()
  area_list: any[];

  @ApiProperty({ type: 'array', example: [{ priority: 'High', score: 90 }] })
  @IsArray()
  @ArrayNotEmpty()
  priority_list: any[];

  @ApiProperty({ example: 1 })
  @IsInt()
  status: number;

  @ApiProperty({ example: 'admin_user' })
  @IsString()
  @MaxLength(100)
  created_by: string;
}
