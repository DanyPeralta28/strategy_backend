import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, MaxLength, IsArray, ArrayNotEmpty, IsOptional } from 'class-validator';

export class CreateFormatFaceDto {
  @ApiProperty({ example: 'Scalingsoft' })
  @IsString()
  @MaxLength(50)
  id_company: string;

  @ApiProperty({ example: 'Reconciliation' })
  @IsString()
  @MaxLength(100)
  function_name: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @MaxLength(250)
  accountable_name: string;

  @ApiProperty({ type: 'array', example: [{ kpi: 'On-time Delivery', target: 95 }] })
  @IsArray()
  @ArrayNotEmpty()
  kpi_list: any[];

  @ApiProperty({ type: 'array', example: [{ month: '2025-08', result: 96 }] })
  @IsArray()
  @ArrayNotEmpty()
  results_list: any[];

  @ApiProperty({ example: 'SUCURSAL_001', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  id_entity?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  status: number;

  @ApiProperty({ example: 'admin_user' })
  @IsString()
  @MaxLength(100)
  created_by: string;
}
